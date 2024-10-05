import java.text.DecimalFormat;
import java.util.InputMismatchException;
import java.util.Scanner;
import com.google.gson.Gson;
import java.util.Currency;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        // Iniciolizar variables necesarias para el programa
        Scanner scanner = new Scanner(System.in);
        String monedaOrigen;
        double monto;
        String monedaDestino;
        // Obtener lista de divisas existentes
        Set<Currency> listaDeDivisas = Currency.getAvailableCurrencies();

        outerLoop:
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
                    (JPY) Yen japonés
                    (KRW) Won sul-coreano
                    (CNY) Yuan chino
                    
                    Ingresa la divisa de origen:
                    """);
            // TODO: implementar variable "salir" para poder salir desde cualquier parte del menú

            while (true) {
                monedaOrigen = scanner.nextLine().toUpperCase();
                String finalMonedaOrigen = monedaOrigen;
                if (listaDeDivisas.stream().anyMatch(c -> c.getCurrencyCode().equals(finalMonedaOrigen))) {
                    break;
                } else if (monedaOrigen.equals("SALIR")){
                    break outerLoop;
                }else {
                    System.out.println("Ingresa una opción válida");
                }
            }
            while (true) {
                try {
                    System.out.println("Ingresa el monto que quieres convertir: ");
                    monto = scanner.nextDouble();
                    scanner.nextLine();
                    if (monto > 0) {
                        break;
                    } else {
                        System.out.println("Ingresa un monto positivo");
                    }
                } catch (InputMismatchException e) {
                    System.out.println("Ingresa un valor numérico");
                    scanner.next();
                }
            }
            while (true) {
                System.out.println("Ingresa la divisa de destino: ");
                monedaDestino = scanner.nextLine().toUpperCase();
                String finalMonedaDestino = monedaDestino;
                if (listaDeDivisas.stream().anyMatch(c -> c.getCurrencyCode().equals(finalMonedaDestino))) {
                    break;
                } else if (monedaDestino.equals("SALIR")){
                    break outerLoop;
                }else {
                    System.out.println("Ingresa una opción válida");
                }
            }

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
                String continuar = scanner.nextLine().toLowerCase();
                while (true) {
                    if (continuar.equals("no") || continuar.equals("n") || continuar.equals("salir")) {
                        break outerLoop;
                    } else if (continuar.equals("si") || continuar.equals("s")) {
                        break;
                    } else {
                        System.out.println("Ingresa una opción válida");
                        continuar = scanner.nextLine().toLowerCase();
                    }
                }
                System.out.println(resultadoFinal);
            } catch (Exception e) {
                e.printStackTrace();
            }

        }

    }
}