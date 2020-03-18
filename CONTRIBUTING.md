# Contribution au projet COVID-19 Infos

Merci pour l'intérêt que vous portez à l'évolution du projet. Lors de vos propositions éviter de traiter plusieurs problématiques. Ciblez un aspect précis (bug, amélioration, fonctionnalité) et traitez-le. Un long code aura du mal à être accepté.

Pour contribuer au projet prière de suivre les directives suivantes.

Faites toutes vos propositions sur la branche [**_develop_**](https://github.com/mendoc/covid-19-infos/tree/develop). Une seule proposition par pull request. Aucun pull request sur la branche **_master_** ne sera accepté.

## Si vous n’avez pas encore le projet en local

Faites un fork du dépôt

Télécharger votre fork en clonant le dépôt
```bash
git clone https://github.com/<votre-nom-utilisateur>/covid-19-infos.git
```
Accédez au dépôt
```bash
cd covid-19-infos
```

De là, suivez les instructions de la section [Si vous avez déjà le projet en local](#2)

## Si vous avez déjà le projet en local

Une fois dans le dépôt en local, basculer à la branch **_develop_**
```bash
git checkout develop
```

Rassurez-vous toujours d’avoir la dernière version de la branche **_develop_** avant de faire votre proposition.
```bash
git pull https://github.com/mendoc/covid-19-infos.git develop
```

Créez une branche en fonction de votre proposition. Par exemple pour travailler sur une nouvelle proposition de barre de navigation on peut avoir :
```bash
git checkout -b nouvelle-navbar
```
Vous pouvez maintenant travailler naturellement.

Une fois que vous avez terminé de travailler et que votre resultat est satisfaisant, faites des dernières vérifications
- Supprimez les fichiers inutiles et inutilisés
- Formatez bien votre code (indentation, règles syntaxiques)
- Renommez bien vos composants (classes, id, variables, fichiers, etc.)
- Rassurez vous d’avoir respecté l’organisation des dossiers du projet (mettre les fichiers dans les dossiers adéquats)
- Faites une dernière vérification pour confirmer que tout est ok.

Créez un commit
```bash
git add .
git commit -m “Amélioration de la barre de navigation”
```

Puis, envoyez votre travail vers votre dépôt distant
```bash
git push origin nouvelle-navbar
```

Pour terminer rendez-vous dans le dépôt en ligne du projet sur la branche **_develop_** (https://github.com/mendoc/covid-19-infos/tree/develop) pour créer un pull request. 

NB : Faites attention de bien choisir la branche **_develop_** lors de la création de votre pull request sinon votre travail ne sera pas considéré.

