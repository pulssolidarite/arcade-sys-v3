# Installation Nouvelle Borne Arcade Puls Impact


## Installation nouvelle borne

Download the raspberry OS **FULL** from [https://www.raspberrypi.org/downloads/raspberry-pi-os/](https://www.raspberrypi.org/downloads/raspberry-pi-os/)

Download the imager for your OS (Windows, Linux, Mac) from [https://www.raspberrypi.org/downloads/](https://www.raspberrypi.org/downloads/)

Flash the SD card

When the SD card is pluged

> **Warning:** Keyboard is most probably in qwerty (GB) by default

Default login : pi

Default password : raspberry

## Configuration

`$ sudo raspi-config`

Go to **7 - Advanced Options**
- **3 - Memory Split**
- - replace 64 by 512 minimum and reboot

## Update Linux

`$ sudo apt-get update`

`$ sudo apt-get upgrade`

`$ sudo apt-get install git snapd xscreensaver`

`$ sudo snap install core`

`$ sudo reboot now`

## Download & Install Retroarch

`$ sudo snap install retroarch`

`$ retroarch`

Go to **Online Updater**
- Download Assets (optional)
- Download Joypad Profiles
- esc to exit
- Reexecute retroarch and configure joypads

## Download and install Puls Impact Overlay

`$ sudo apt-get install arp-scan`

Download latest App Image release of arcade-sys-v3 and place it in home directory.

`$ chmod a+x PULS-Front-end-X.X.X-armv7l.AppImage`

Add these two lines at the end of `.bashrc` :

> Warning : Make sure to create a new terminal (and activate it) on the Admin Panel and use the logins for following step.

`export PULS_LOGIN=???`

`export PULS_MDP=???`

`$ source .bashrc`

Download games

`$ git clone https://github.com/pulssolidarite/arcade-sys-games.git`

Test the overlay

`$ ./PULS-Front-end-X.X.X-armv7l.AppImage`

> Info : If the first screen stays white, restart the overlay


## Autostart AppImage 

Go into autostart file in LXDE-pi directory :

`sudo nano /etc/xdg/lxsession/LXDE-pi/autostart`

And add at the end, the path to AppImage : 

`@/home/pi/PULS-Front-end-X.X.X-armv7l.AppImage`

WARNING : The version number need to be change for each update of the application. 

You can comment the @lxpanel line to disable the toolbar on desktop
You can comment the @pcmanfm line to disable desktop
You can comment the @screensaver line to disable screensaver

## Borne en connexion WIFI

`sudo apt-get install network-manager network-manager-gnome`

`sudo systemctl stop dhcpcd.service`

`sudo systemctl disable dhcpcd.service`

`sudo systemctl enable NetworkManager.service`

`sudo systemctl start NetworkManager.service`

Reboot

Activer le wifi

Click droit sur l'icone réseau dans la barre des tâches -> Modifier les réseaux -> Modifier connexion ethernet (cablée) -> IPV4 -> Partager avec d'autre appareils.

Reboot toute la borne

Magie ça marche ! si tout est branché...
