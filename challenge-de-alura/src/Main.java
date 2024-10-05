import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Scanner;
import com.google.gson.Gson;

public class Main {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        String continuar = "y";


        while (true) {
            System.out.println("""
                    ***¡Bienvenido/a al conversor de divisas!***
                    Instrucciones: Ingresa la divisa de origen, el monto y la divisa de destino.
                    (USD) Dólar estadounidense
                    (EUR) Euro
                    (GBP) Libra esterlina
                    (MXN) Peso mexicano
                    (COP) Peso Colombiano
                    (ARS) Peso argentino
                    (CLP) Peso chileno
                    (PEN) Sol peruano
                    (JPY) Yen japónés
                    (KRW) Won sul-coreano
                    (CNY) Yuan chino
                    
                    Ingresa la divisa de origen:
                    """);
            String monedaOrigen = scanner.nextLine().toUpperCase();

            System.out.println("Ingresa el monto que quieres convertir: ");
            double monto = scanner.nextDouble();
            scanner.nextLine();

            System.out.println("Ingresa la divisa de destino: ");
            String monedaDestino = scanner.nextLine().toUpperCase();

            Solicitud solicitud = new Solicitud();
            String resultado = solicitud.solicitud(monedaOrigen);

            Gson gson = new Gson();

            try {
                Moneda moneda = gson.fromJson(resultado, Moneda.class);
                double tasa = moneda.conversion_rates().get(monedaDestino);
                double resultadoFinal = monto * tasa;
                DecimalFormat formato = new DecimalFormat("#,##0.00");
                String resultadoFinalFormateado = formato.format(resultadoFinal);

                System.out.println("""
                        Divisa de origen:\s""" + monedaOrigen + """
                        \nDivisa de destino:\s""" + monedaDestino + """
                        \nMonto:\s""" + monto + """
                        \nTasa:\s""" + tasa + """
                        \nTotal:\s""" + resultadoFinalFormateado + """
                        """);
                System.out.println("Deseas hacer otra conversión? (si/no): ");
                continuar = scanner.nextLine().toLowerCase();

                if (continuar.equals("no") || continuar.equals("n")) {
                    break;
                }
                System.out.println(resultadoFinal);
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
        scanner.close();
    }
}