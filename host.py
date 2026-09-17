from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import os

HOST = "0.0.0.0"
PORT = 8080

os.chdir(os.path.dirname(os.path.abspath(__file__)))

server = ThreadingHTTPServer((HOST, PORT), SimpleHTTPRequestHandler)

print(f"Server running at:")
print(f"  http://localhost:{PORT}/")
print("Press Ctrl+C to stop.")

try:
    server.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")
    server.server_close()