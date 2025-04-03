#!/bin/bash

# Aller dans le dossier du projet
cd ~/Dokumente/project/python\(Back_front\)/taskmanager || exit

# Activer l'environnement virtuel (si tu en as un)
# source venv/bin/activate
source ./venv/bin/activate

# Lancer le serveur
python3 manage.py runserver