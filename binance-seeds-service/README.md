# Binance Seeds Service

Este proyecto es un servicio automatizado que interactúa con la API de Binance para realizar transacciones de compra y venta de activos de forma recurrente. Utiliza un sistema de "semillas" para gestionar los activos y optimizar las operaciones de trading.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- **src/**: Contiene el código fuente del servicio.
  - **index.ts**: Punto de entrada de la aplicación. Inicializa el servicio y configura el scheduler.
  - **config.ts**: Configuración del servicio, incluyendo constantes como el número de semillas y el valor inicial.
  - **binance/**: Módulo para manejar la interacción con la API de Binance.
    - **api.ts**: Funciones para realizar llamadas a la API y obtener precios actuales.
    - **trading.ts**: Funciones para gestionar operaciones de trading.
  - **seeds/**: Módulo para gestionar las semillas.
    - **seedManager.ts**: Clase que maneja la creación y ocupación de semillas.
    - **seed.ts**: Clase que representa una semilla y su estado.
  - **strategy/**: Implementación de la lógica de trading.
    - **pidFormula.ts**: Cálculo del peso de cada activo usando una fórmula PID.
  - **scheduler.ts**: Programa las llamadas a la API de Binance a intervalos regulares.
  - **types/**: Definiciones de tipos e interfaces utilizadas en el proyecto.
    - **index.ts**: Exporta tipos e interfaces.

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```
   cd binance-seeds-service
   ```
3. Instala las dependencias:
   ```
   npm install
   ```

## Uso

Para iniciar el servicio, ejecuta el siguiente comando:
```
npm start
```

El servicio comenzará a ejecutar tareas recurrentes para interactuar con la API de Binance, gestionando las semillas y realizando transacciones automáticamente.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar el proyecto, por favor abre un issue o un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.