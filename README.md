
<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="Ilog" />

  &#xa0;

  <!-- <a href="https://ilog.netlify.app">Demo</a> -->
</div>

<h1 align="center">PROJET ILOG</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/hgdautricourt/ILOG?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/hgdautricourt/ilog?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/hgdautricourt/ilog?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/hgdautricourt/ilog?color=56BEB8">
</p>

<p align="center">
  <a href="#dart-about">Description</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Dépendances</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Pour commencer</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/hgdautricourt" target="_blank">Hugo Dautricourt</a> &#xa0; | &#xa0;
  <a href="https://github.com/HugoDerigny" target="_blank">Hugo Derigny</a>
</p>

<br>


## :dart: Description ##

Projet de ILOG n°14 : **Pointeur laser virtuel**
Ce projet est réalisé en Typescript pour la partie web et en NestJS pour le serveur.

## :gear: Difficulté du serveur ##

Pour utiliser correctement l'API DeviceMotionEvent, les navigateurs modernes requièrent que le site soit sécurisés avec
un certificat SSL. Autrement dit, que le site web soit en `https`, auquel cas il est impossible d'utiliser l'API.

Nous avons donc dû déployer notre site gratuitement sur la plateforme _Vercel_ afin d'avoir un certificat SSL. Ce qui est super pour
notre simple page. Cependant, Vercel ne permet pas d'héberger un serveur node.js pour utiliser les websockets. J'ai _(Hugo Derigny)_
donc dû utiliser un projet de mon travail qui est hébergé et qui utilise NestJS pour notre websocket.

Le code de la websocket est donc le suivant :
```typescript
@WebSocketGateway({
  cors: { origin: true },
  transports: ['websocket'],
})
export class Gateway {
    @WebSocketServer()
    server: Server;
    
    @SubscribeMessage('laser.update')
    async laserUpdate(@MessageBody() data: { x: number; y: number }) {
        this.server.emit('slides.update', data);
    }
}
```

Les annotations correspondent à :
- `@WebSocketGateway()` créer un serveur websocket
- `@WebSocketServer()` renvoie le serveur de websocket qui nous permet de communiquer avec les clients connectés
- `@SubscribeMessage()` permet d'associer une fonction à un message envoyé par un client
- `@MessageBody()` au contenu envoyé par le client

Cette fonction permet donc de récupérer les données envoyées par le client et de les transmettre à tous les clients connectés.

Afin de ne pas trop charger le serveur du travail, nous avons pris la décision de faire les calculs côté client, même si 
cela aurait été mieux côté serveur.

## :sparkles: Features ##

La page laserpointer (sur un navigateur de mobile) comporte un script qui capte les événements "devicemotion" de type DeviceMotionEvent :
-   elle envoie au serveur les informations issues de l'accéléromètre ;
-   la page slides (sur une autre machine) comporte un script qui :
-   reçoit du serveur les informations issues de l'accéléromètre ;
-   les exploite pour déplacer un curseur sur un canvas HTML.

## :rocket: Technologies ##

The following tools were used in this project:

- [NestJS](https://nestjs.com)
- [TypeScript](https://www.typescriptlang.org/)
- [WebPack](https://webpack.js.org/)
- [Vercel](https://vercel.com)

## :white_check_mark: Dépendances ##

Pour utiliser ce projet, vous aurez besoin de [Git](https://git-scm.com) et [Node](https://nodejs.org/en/) d'installer.

## :checkered_flag: Pour commencer ##

```bash
# Cloner ce projet
$ git clone https://github.com/hgdautricourt/ILOG

# Installer les dépendances via votre manager de paquet node
$ yarn
# OU
$ npm run install

# Lancer le projet
$ yarn run watch

# Ouvrir le fichier public/index.html
```

## :memo: Licence ##

This project is under license from MIT. 

Made with by <a href="https://github.com/{{hgdautricourt}}" target="_blank">Hugo Dautricourt</a> and <a href="https://github.com/HugoDerigny" target="_blank">Hugo Derigny</a>


&#xa0;

<a href="#top">Retour au début</a>
