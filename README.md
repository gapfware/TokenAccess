# TokenAccess

## Descripción del proyecto

TokenAccess, un proyecto que utiliza la tecnología blockchain para crear una plataforma de venta y gestión de entradas para eventos culturales, deportivos y sociales. Cuyo objetivo es ofrecer una solución innovadora, segura y transparente para los organizadores y los asistentes de estos eventos.

El proyecto se basa en el estándar ERC721, que nos permite crear tokens no fungibles que representan las entradas para cada ocasión. Cada entrada es única e intransferible, y está asociada a un asiento específico que el usuario elige al comprarla. De esta manera, evitamos la reventa, el fraude y la duplicación de entradas.

Nuestro contrato inteligente permite al propietario del contrato crear y listar nuevas ocasiones, especificando el nombre, el costo, el número máximo de entradas, la fecha, la hora y la ubicación del evento. Los usuarios pueden comprar las entradas enviando la cantidad requerida de ether al contrato, y recibirán un token ERC721 que acredita su compra. El contrato también lleva la cuenta de las entradas disponibles y vendidas, y de los asientos ocupados para cada ocasión.

Nuestro proyecto ofrece varias ventajas para los organizadores y los asistentes de los eventos. Por un lado, los organizadores pueden reducir los costos de intermediación, tener un mayor control sobre la venta y distribución de las entradas, y recibir los pagos de forma instantánea y segura. Por otro lado, los asistentes pueden acceder a una plataforma fácil de usar, comprar las entradas con criptomonedas, elegir el asiento que prefieren, y tener la garantía de que su entrada es válida y auténtica.

TokenAccess es un proyecto que combina la creatividad, la tecnología y la cultura, para ofrecer una nueva forma de disfrutar de los eventos que nos apasionan.

## ¿Cómo se desarrollará?

Para el desarrollo del proyecto utilizaremos Hardhat.js que es un framework para el desarrollo de contratos inteligentes en Solidity. Este permite compilar, probar, depurar y desplegar tus contratos de forma fácil y rápida. Además, de ofrecer una red local de Ethereum diseñada para el desarrollo, con funcionalidades como trazas de pila de Solidity, console.log y mensajes de error explícitos cuando las transacciones fallan. Hardhat.js también es extensible y compatible con otros plugins y herramientas que puedes integrar en tu flujo de trabajo.

## Características del Smart Contract

El contrato inteligente llamado TokenAccess es un token ERC721 que permite a los usuarios comprar entradas para diferentes eventos usando Ethereum. El contrato tiene las siguientes características:

- El contrato hereda del estándar ERC721, lo que significa que puede crear tokens no fungibles que representan activos digitales únicos.
- El contrato tiene una estructura llamada Occasion, que almacena la información sobre cada ocasión, como su nombre, costo, fecha, hora, ubicación y el número de entradas disponibles y vendidas.
- El contrato tiene un mapeo llamado occasions, que asigna cada id de ocasión a una estructura Occasion. El contrato también tiene una variable llamada totalOccasions, que lleva la cuenta de cuántas ocasiones se han creado.
- El contrato tiene un modificador llamado onlyOwner, que restringe algunas funciones a ser solo invocables por el propietario del contrato. El propietario se establece en la dirección que desplegó el contrato en el constructor.
- El contrato tiene una función llamada list, que permite al propietario crear una nueva ocasión y agregarla al mapeo occasions. La función toma el nombre, el costo, el número máximo de entradas, la fecha, la hora y la ubicación de la ocasión como parámetros.
El contrato tiene una función llamada mint, que permite a cualquier usuario comprar una entrada para una ocasión enviando la cantidad requerida de ether. La función toma el id de la ocasión y el número de asiento como parámetros. La función verifica que el id de la ocasión sea válido, que el usuario tenga suficientes fondos, que la ocasión tenga entradas disponibles y que el asiento no esté ocupado. La función luego decrementa el número de entradas para la ocasión, marca al usuario como comprador, asigna el asiento al usuario y acuña un nuevo token ERC721 para el usuario.
- El contrato tiene una función llamada getOccasion, que devuelve la estructura Occasion para un id de ocasión dado. La función toma el id de la ocasión como parámetro y devuelve la estructura Occasion como una variable de memoria.
- El contrato tiene una función llamada getSeatsTaken, que devuelve un arreglo de números de asiento que han sido ocupados para un id de ocasión dado. La función toma el id de la ocasión como parámetro y devuelve el arreglo como una variable de memoria.
- El contrato tiene una función llamada withdraw, que permite al propietario retirar todo el ether que se ha recaudado de las ventas de entradas. La función envía el saldo del contrato a la dirección del propietario.

