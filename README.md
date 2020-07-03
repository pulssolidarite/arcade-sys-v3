# PULS Sys V2

> A complete system to manage Arcade terminal capable of running retro games with donations management.

#### Build Setup

```bash
1 - Flash Raspbian
2 - Build Retroarch 1.7.7 --> https://gist.github.com/AlexMax/32e5d038a66ce57253e740ea75736805 
3 - Télécharger la dernière release et la mettre sur le bureau --> https://github.com/hilaliMoncef/arcade-sys/releases
4 - cd /home/pi/Desktop
5 - chmod a+x LeNomDuFichier.AppImage
6 - Add Env Variables --> sudo nano /etc/profile et ajouter à la fin "export PULS_LOGIN=LeLoginChoisi" et ensuite "export PULS_MDP=LeMDPChoisi"
7 - Faire cd /home/pi et puis faire un "git clone https://github.com/hilaliMoncef/arcade-sys-games.git". Un nouveau dossier contenant les jeux et les cores sera créé. Il faudra rajouter les jeux dessus plus tard et ensuite programmer un "git pull" automatique.
8 - Reboot
9 - Lancer l'appImage
```

#### Prerequisites

- RetroArch 1.7.7 installed and configured
- Node.js with Electron JS
- Payter Terminal
- Linux armv7l Environnement for building
