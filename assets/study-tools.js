"use strict";

class ToolInputError extends Error {}

function formatNumber(value) {
    if (!Number.isFinite(value)) throw new ToolInputError("The result is outside the supported numeric range.");
    return new Intl.NumberFormat(undefined, { maximumSignificantDigits: 12 }).format(value);
}

function requireNumber(values, key, label, options) {
    const raw = values[key];
    if (raw === undefined || raw.trim() === "") throw new ToolInputError(`Enter ${label}.`);
    const value = Number(raw);
    if (!Number.isFinite(value)) throw new ToolInputError(`Enter a valid ${label}.`);
    if (options && options.integer && !Number.isSafeInteger(value)) {
        throw new ToolInputError(`${label} must be a whole number within the safe integer range.`);
    }
    if (options && options.min !== undefined && value < options.min) {
        throw new ToolInputError(`${label} must be at least ${formatNumber(options.min)}.`);
    }
    if (options && options.max !== undefined && value > options.max) {
        throw new ToolInputError(`${label} must be no more than ${formatNumber(options.max)}.`);
    }
    return value;
}

function requireList(values, key, label) {
    const raw = values[key];
    if (!raw || !raw.trim()) throw new ToolInputError(`Enter ${label}.`);
    const items = raw.trim().split(/[,;\s]+/).filter(Boolean).map(Number);
    if (!items.length || items.some(value => !Number.isFinite(value))) {
        throw new ToolInputError(`Enter ${label} as numbers separated by commas or spaces.`);
    }
    if (items.length > 500) throw new ToolInputError("Enter no more than 500 numbers at a time.");
    return items;
}

function gcdBigInt(left, right) {
    left = left < 0n ? -left : left;
    right = right < 0n ? -right : right;
    while (right !== 0n) [left, right] = [right, left % right];
    return left;
}

function reduceBigFraction(numerator, denominator) {
    if (denominator === 0n) throw new ToolInputError("A denominator cannot be zero.");
    const divisor = gcdBigInt(numerator, denominator) || 1n;
    numerator /= divisor;
    denominator /= divisor;
    if (denominator < 0n) {
        numerator = -numerator;
        denominator = -denominator;
    }
    return { numerator, denominator };
}

function decimalFraction(raw) {
    const match = raw.trim().match(/^([+-]?)(\d*)(?:\.(\d*))?(?:e([+-]?\d+))?$/i);
    if (!match || (!match[2] && !match[3])) throw new ToolInputError("Enter a valid decimal number.");
    const exponent = Number(match[4] || 0);
    const fractionalLength = (match[3] || "").length;
    const scale = fractionalLength - exponent;
    if (Math.abs(exponent) > 100 || Math.abs(scale) > 100) {
        throw new ToolInputError("Use a decimal with at most 100 places of scale.");
    }
    let numerator = BigInt(`${match[1]}${match[2] || "0"}${match[3] || ""}`);
    let denominator = 1n;
    if (scale > 0) denominator = 10n ** BigInt(scale);
    if (scale < 0) numerator *= 10n ** BigInt(-scale);
    return reduceBigFraction(numerator, denominator);
}

const handlers = {
    percentage(values) {
        const percent = requireNumber(values, "percent", "a percentage");
        const amount = requireNumber(values, "amount", "a number");
        return `${formatNumber(percent)}% of ${formatNumber(amount)} = ${formatNumber(percent * amount / 100)}`;
    },
    grades(values) {
        const scores = requireList(values, "scores", "scores");
        if (scores.some(score => score < 0 || score > 100)) {
            throw new ToolInputError("Use scores from 0 to 100.");
        }
        const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        return `${formatNumber(average)}% average from ${scores.length} ${scores.length === 1 ? "score" : "scores"}.`;
    },
    fractions(values) {
        const numerator = requireNumber(values, "numerator", "a numerator", { integer: true });
        const denominator = requireNumber(values, "denominator", "a denominator", { integer: true });
        const fraction = reduceBigFraction(BigInt(numerator), BigInt(denominator));
        return `${numerator}/${denominator} = ${fraction.numerator}/${fraction.denominator} (${formatNumber(numerator / denominator)})`;
    },
    length(values) {
        const metersPerUnit = { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 };
        const value = requireNumber(values, "value", "a value");
        const from = values.from;
        const to = values.to;
        const converted = value * metersPerUnit[from] / metersPerUnit[to];
        if (!Number.isFinite(converted)) throw new ToolInputError("The converted value is outside the supported range.");
        return `${formatNumber(value)} ${from} = ${formatNumber(converted)} ${to}`;
    },
    ratio(values) {
        const a = requireNumber(values, "a", "the first value");
        const b = requireNumber(values, "b", "the second value");
        const c = requireNumber(values, "c", "the third value");
        if (a === 0) throw new ToolInputError("The first value cannot be zero.");
        const answer = b * c / a;
        if (!Number.isFinite(answer)) throw new ToolInputError("The answer is outside the supported range.");
        return `a:b = c:x → ${formatNumber(a)}:${formatNumber(b)} = ${formatNumber(c)}:${formatNumber(answer)}. x = ${formatNumber(answer)}`;
    },
    "gcf-lcm"(values) {
        const a = requireNumber(values, "a", "the first integer", { integer: true });
        const b = requireNumber(values, "b", "the second integer", { integer: true });
        const bigA = BigInt(a);
        const bigB = BigInt(b);
        const gcd = gcdBigInt(bigA, bigB);
        const lcm = gcd === 0n ? 0n : (bigA / gcd) * bigB;
        const absLcm = lcm < 0n ? -lcm : lcm;
        return `GCF: ${gcd}\nLCM: ${absLcm}`;
    },
    statistics(values) {
        const numbers = requireList(values, "data", "numbers");
        const ordered = [...numbers].sort((a, b) => a - b);
        const mean = numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
        const middle = Math.floor(ordered.length / 2);
        const median = ordered.length % 2 ? ordered[middle] : (ordered[middle - 1] + ordered[middle]) / 2;
        const counts = new Map();
        numbers.forEach(value => counts.set(value, (counts.get(value) || 0) + 1));
        const highestCount = Math.max(...counts.values());
        const modes = highestCount > 1
            ? [...counts].filter(([, count]) => count === highestCount).map(([value]) => formatNumber(value)).join(", ")
            : "No repeated mode";
        return `Mean: ${formatNumber(mean)}\nMedian: ${formatNumber(median)}\nMode: ${modes}`;
    },
    "prime-factors"(values) {
        const number = requireNumber(values, "number", "a whole number", { integer: true, min: 2, max: 1_000_000_000_000 });
        let remaining = number;
        const factors = [];
        for (let factor = 2; factor <= remaining / factor; factor += factor === 2 ? 1 : 2) {
            while (remaining % factor === 0) {
                factors.push(factor);
                remaining /= factor;
            }
        }
        if (remaining > 1) factors.push(remaining);
        const isPrime = factors.length === 1 && factors[0] === number;
        return `${number} is ${isPrime ? "prime" : "composite"}.\nPrime factorization: ${factors.join(" × ")}.`;
    },
    powers(values) {
        const base = requireNumber(values, "base", "a base");
        const exponent = requireNumber(values, "exponent", "an exponent");
        const answer = base ** exponent;
        if (!Number.isFinite(answer)) throw new ToolInputError("The result is outside the supported range.");
        return `${formatNumber(base)}^${formatNumber(exponent)} = ${formatNumber(answer)}`;
    },
    "linear-equation"(values) {
        const a = requireNumber(values, "a", "coefficient a");
        const b = requireNumber(values, "b", "constant b");
        const c = requireNumber(values, "c", "right side c");
        if (a === 0) return b === c ? "Every real number is a solution." : "There is no solution.";
        return `x = (${formatNumber(c)} − ${formatNumber(b)}) ÷ ${formatNumber(a)} = ${formatNumber((c - b) / a)}`;
    },
    "quadratic-equation"(values) {
        const a = requireNumber(values, "a", "coefficient a");
        const b = requireNumber(values, "b", "coefficient b");
        const c = requireNumber(values, "c", "constant c");
        if (a === 0) {
            if (b === 0) return c === 0 ? "Every real number is a solution." : "There is no solution.";
            return `This is linear. x = ${formatNumber(-c / b)}`;
        }
        const discriminant = b * b - 4 * a * c;
        if (!Number.isFinite(discriminant)) throw new ToolInputError("These coefficients are outside the supported range.");
        if (discriminant < 0) return `No real solutions. Discriminant: ${formatNumber(discriminant)}.`;
        const root = Math.sqrt(discriminant);
        const x1 = (-b + root) / (2 * a);
        const x2 = (-b - root) / (2 * a);
        return x1 === x2 ? `One real solution: x = ${formatNumber(x1)}` : `x₁ = ${formatNumber(x1)}\nx₂ = ${formatNumber(x2)}`;
    },
    pythagorean(values) {
        const sideA = requireNumber(values, "sideA", "side a", { min: 0 });
        const sideB = requireNumber(values, "sideB", "side b", { min: 0 });
        return `c = √(${formatNumber(sideA)}² + ${formatNumber(sideB)}²) = ${formatNumber(Math.hypot(sideA, sideB))}`;
    },
    circle(values) {
        const radius = requireNumber(values, "radius", "a radius", { min: 0 });
        return `Area: ${formatNumber(Math.PI * radius ** 2)}\nCircumference: ${formatNumber(2 * Math.PI * radius)}`;
    },
    rectangle(values) {
        const length = requireNumber(values, "length", "a length", { min: 0 });
        const width = requireNumber(values, "width", "a width", { min: 0 });
        return `Area: ${formatNumber(length * width)}\nPerimeter: ${formatNumber(2 * (length + width))}\nDiagonal: ${formatNumber(Math.hypot(length, width))}`;
    },
    temperature(values) {
        const value = requireNumber(values, "value", "a temperature");
        const from = values.from;
        const to = values.to;
        const celsius = from === "c" ? value : from === "f" ? (value - 32) * 5 / 9 : value - 273.15;
        if (celsius < -273.15) throw new ToolInputError("Temperature cannot be below absolute zero.");
        const converted = to === "c" ? celsius : to === "f" ? celsius * 9 / 5 + 32 : celsius + 273.15;
        const units = { c: "°C", f: "°F", k: "K" };
        return `${formatNumber(value)} ${units[from]} = ${formatNumber(converted)} ${units[to]}`;
    },
    mass(values) {
        const gramsPerUnit = { mg: 0.001, g: 1, kg: 1000, oz: 28.349523125, lb: 453.59237, ton: 907184.74 };
        const labels = { mg: "mg", g: "g", kg: "kg", oz: "oz", lb: "lb", ton: "US tons" };
        const value = requireNumber(values, "value", "a mass", { min: 0 });
        const from = values.from;
        const to = values.to;
        const converted = value * gramsPerUnit[from] / gramsPerUnit[to];
        if (!Number.isFinite(converted)) throw new ToolInputError("The converted value is outside the supported range.");
        return `${formatNumber(value)} ${labels[from]} = ${formatNumber(converted)} ${labels[to]}`;
    },
    "number-base"(values) {
        const number = requireNumber(values, "number", "a decimal integer", { integer: true });
        return `Binary: ${number.toString(2)}\nOctal: ${number.toString(8)}\nHexadecimal: ${number.toString(16).toUpperCase()}`;
    },
    "roman-numerals"(values) {
        let number = requireNumber(values, "number", "a whole number", { integer: true, min: 1, max: 3999 });
        const numerals = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
        let roman = "";
        for (const [value, symbol] of numerals) {
            while (number >= value) {
                roman += symbol;
                number -= value;
            }
        }
        return roman;
    },
    "multiplication-table"(values) {
        const number = requireNumber(values, "number", "a number");
        const limit = requireNumber(values, "limit", "a number of rows", { integer: true, min: 1, max: 20 });
        return Array.from({ length: limit }, (_, index) => {
            const multiplier = index + 1;
            return `${formatNumber(number)} × ${multiplier} = ${formatNumber(number * multiplier)}`;
        }).join("\n");
    },
    "scientific-notation"(values) {
        const number = requireNumber(values, "number", "a number");
        return `${formatNumber(number)} = ${number.toExponential(6)}`;
    },
    "decimal-converter"(values) {
        const raw = values.decimal;
        const number = requireNumber(values, "decimal", "a decimal number");
        const fraction = decimalFraction(raw);
        const fractionText = fraction.denominator === 1n
            ? `${fraction.numerator}`
            : `${fraction.numerator}/${fraction.denominator}`;
        return `Fraction: ${fractionText}\nPercent: ${formatNumber(number * 100)}%`;
    },
    "fraction-arithmetic"(values) {
        const numeratorA = requireNumber(values, "numeratorA", "the first numerator", { integer: true });
        const denominatorA = requireNumber(values, "denominatorA", "the first denominator", { integer: true });
        const numeratorB = requireNumber(values, "numeratorB", "the second numerator", { integer: true });
        const denominatorB = requireNumber(values, "denominatorB", "the second denominator", { integer: true });
        if (!denominatorA || !denominatorB) throw new ToolInputError("Denominators cannot be zero.");
        const leftN = BigInt(numeratorA);
        const leftD = BigInt(denominatorA);
        const rightN = BigInt(numeratorB);
        const rightD = BigInt(denominatorB);
        let numerator;
        let denominator;
        switch (values.operation) {
            case "+": numerator = leftN * rightD + rightN * leftD; denominator = leftD * rightD; break;
            case "-": numerator = leftN * rightD - rightN * leftD; denominator = leftD * rightD; break;
            case "*": numerator = leftN * rightN; denominator = leftD * rightD; break;
            case "/":
                if (rightN === 0n) throw new ToolInputError("Cannot divide by a zero fraction.");
                numerator = leftN * rightD;
                denominator = leftD * rightN;
                break;
            default: throw new ToolInputError("Choose a valid fraction operation.");
        }
        const fraction = reduceBigFraction(numerator, denominator);
        const decimal = Number(fraction.numerator) / Number(fraction.denominator);
        return `${numeratorA}/${denominatorA} ${values.operation} ${numeratorB}/${denominatorB} = ${fraction.numerator}/${fraction.denominator} (${formatNumber(decimal)})`;
    },
    probability(values) {
        const favorable = requireNumber(values, "favorable", "favorable outcomes", { integer: true, min: 0 });
        const total = requireNumber(values, "total", "total outcomes", { integer: true, min: 1 });
        if (favorable > total) throw new ToolInputError("Favorable outcomes cannot exceed total outcomes.");
        const fraction = reduceBigFraction(BigInt(favorable), BigInt(total));
        return `Probability: ${fraction.numerator}/${fraction.denominator}\nPercent chance: ${formatNumber(favorable / total * 100)}%`;
    },
    slope(values) {
        const x1 = requireNumber(values, "x1", "x₁");
        const y1 = requireNumber(values, "y1", "y₁");
        const x2 = requireNumber(values, "x2", "x₂");
        const y2 = requireNumber(values, "y2", "y₂");
        if (x1 === x2) return `Slope is undefined. The line is vertical: x = ${formatNumber(x1)}.`;
        const slope = (y2 - y1) / (x2 - x1);
        const intercept = y1 - slope * x1;
        const equation = slope === 0
            ? `y = ${formatNumber(intercept)}`
            : intercept === 0
                ? `y = ${formatNumber(slope)}x`
                : `y = ${formatNumber(slope)}x ${intercept < 0 ? "−" : "+"} ${formatNumber(Math.abs(intercept))}`;
        return `Slope: ${formatNumber(slope)}\nLine: ${equation}`;
    },
    "coordinate-distance"(values) {
        const x1 = requireNumber(values, "x1", "x₁");
        const y1 = requireNumber(values, "y1", "y₁");
        const x2 = requireNumber(values, "x2", "x₂");
        const y2 = requireNumber(values, "y2", "y₂");
        return `Distance: ${formatNumber(Math.hypot(x2 - x1, y2 - y1))}\nMidpoint: (${formatNumber((x1 + x2) / 2)}, ${formatNumber((y1 + y2) / 2)})`;
    },
};

const toolPage = document.querySelector("[data-tool]");
const toolKind = toolPage.dataset.tool;
const form = document.querySelector("#toolForm");
const result = document.querySelector("#toolResult");

function updateResult() {
    const values = Object.fromEntries([...form.querySelectorAll("[data-field]")].map(field => [field.dataset.field, field.value]));
    try {
        const calculate = handlers[toolKind];
        if (!calculate) throw new Error(`No calculation is registered for "${toolKind}".`);
        result.textContent = calculate(values);
    } catch (error) {
        if (!(error instanceof ToolInputError)) throw error;
        result.textContent = error.message;
    }
}

form.addEventListener("submit", event => event.preventDefault());
form.addEventListener("input", updateResult);
form.addEventListener("change", updateResult);
