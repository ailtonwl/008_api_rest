import { main } from './main';

const port = 3000;

main.server.listen(port, () => {
  console.log(`Servidor inicializado na porta ${port}.`);
});
