# Installation Nouvelle Borne Arcade Puls Impact

## Optional : Project compilation

For generate css : 
Go to src > renderer > assets > css and execute :  
`./dart-sass/sass ./sass/theme.scss ./theme.css` to generate or edit css. 

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

Go to **4 - Localisation Options**
- **2 - Timezone** to Europe/Paris
- **3 - Keyboard** to appropriate keyboard brand and language
- **4 - WLAN Country** to France

Go to **2 - Network Options**
- **2 - Wireless LAN**
- - enter wifi name and password
- - Test network with `ping` or `ifconfig`

Go to **7 - Advanced Options**
- **3 - Memory Split**
- - replace 64 by 128 minimum and reboot

## Update Linux

`$ sudo apt-get update`

`$ sudo apt-get upgrade`

`$ sudo atp-get install git`

Accept the clipit security question.

## Download & Install Retroarch

`$ sudo apt-get install build-essential libasound2-dev libudev-dev libgl-dev`

`$ curl -LOk 'https://github.com/libretro/RetroArch/archive/v1.7.7.tar.gz'`

`$ tar -zxvf v1.7.7.tar.gz`

`$ cd RetroArch-1.7.7`

`$ sudo ./configure --enable-alsa --enable-udev --enable-floathard --enable-neon --enable-dispmanx --disable-opengl1`

`$ sudo make`

`$ sudo make install`

`$ retroarch`

Go to **Online Updater**
- Download Assets (optional)
- Download Joypad Profiles
- esc to exit
- Reexecute retroarch and configure joypads

$`cd`

## Download and install Puls Impact Overlay

`$ curl -LOk "https://github.com/hilaliMoncef/arcade-sys/releases/download/v2.0.4/PULS-Front-end-2.0.4-armv7l.AppImage"`

`$ chmod a+x PULS-Front-end-2.0.4-armv7l.AppImage`

Add these two lines at the end of `/etc/profile` as root :

> Warning : Make sure to create a new terminal on the Heroku's Admin Panel and use the login for following step.

`export PULS_LOGIN=???`

`export PULS_MDP=???`

`$ source /etc/profile`

Download games

`$ git clone https://github.com/hilaliMoncef/arcade-sys-games.git`

Test the overlay

`$ ./PULS-Front-end-2.0.4-armv7l.AppImage`

> Info : If the first screen stays white, please reload the overlay


## Autostart AppImage 

Go into autostart file in LXDE-pi directory :

`sudo nano /etc/xdg/lxsession/LXDE-pi/autostart`

And add at the end, the path to AppImage : 

`@/home/pi/PULS-Front-end-X.X.X-armv7l.AppImage`

WARNING : The version number need to be change for each update of the application. 

You can comment the @lxpanel line to disable the toolbar on desktop
You can comment the @pcmanfm line to disable desktop
You can comment the @screensaver line to disable screensaver
