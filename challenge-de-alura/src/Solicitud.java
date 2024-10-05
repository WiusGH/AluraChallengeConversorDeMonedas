
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Solicitud {
    public String solicitud(String monedaOrigen) {
        final String APIKEY = "0356dbdf0d2bac7603c47bd9";
        final String URL = "https://v6.exchangerate-api.com/v6/" + APIKEY + "/latest/" + monedaOrigen;

        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(URL))
                    .build();
            HttpResponse<String> response = client
                    .send(request, HttpResponse.BodyHandlers.ofString());
            return response.body();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            System.out.println("Error al realizar la solicitud.");
            return null;
        }
    }
}
