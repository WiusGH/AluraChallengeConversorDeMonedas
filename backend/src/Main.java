import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class Main {

    public static void main(String[] args) throws IOException {
        String APIKEY = "0356dbdf0d2bac7603c47bd9";
        String URI = "https://v6.exchangerate-api.com/v6/" + APIKEY + "/latest/USD";
        // Create an HTTP server listening on port 8000
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        // Define a route and its handler
        server.createContext("/convert", new ConvertHandler());
        // Start the server
        server.setExecutor(null); // Use the default executor
        server.start();
        System.out.println("Server started on port 8000");
    }
    // Handler for the /convert endpoint
    static class ConvertHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Only allow GET requests
            if ("GET".equals(exchange.getRequestMethod())) {
                // Extract query parameters (e.g., amount, from, to)
                String query = exchange.getRequestURI().getQuery(); // e.g., ?amount=100&from=USD&to=EUR
                // Dummy logic to simulate conversion (you'd call an actual API here)
                String response = "Converted 100 USD to 85 EUR"; // Replace with real logic
                // Send response
                exchange.sendResponseHeaders(200, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            } else {
                // Return 405 Method Not Allowed for non-GET requests
                exchange.sendResponseHeaders(405, -1); // No response body
            }
        }
    }
}
