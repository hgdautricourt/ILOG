# ILOG
Projet d'ilog, trop pressé de le faire


> Pointeur laser virtuel

### Utiliser l'accéléromètre d'un smartphone via un navigateur mobile.

## Features

    - la page laserpointer (sur un navigateur de mobile) comporte un script qui capte les événements "devicemotion" de type DeviceMotionEvent ;
    elle envoie au serveur les informations issues de l'accéléromètre ;
    - la page slides (sur une autre machine) comporte un script qui :
        reçoit du serveur les informations issues de l'accéléromètre ;
    - les exploite pour déplacer un curseur sur un canvas HTML.

## TODO

    - côté serveur, mettre en oeuvre https pour servir la page laserpointer ;
    - tester laserpointer sur un navigateur mobile ;
    - écrire le code serveur de diffusion des data accéléromètre vers le(s) navigateurs exécutant le script de slides ;
    - tester slides sur une seule machine dans un premier temps ;
    - utiliser une ionic/webview seulement en cas de difficultés de captation des événements devicemotion.