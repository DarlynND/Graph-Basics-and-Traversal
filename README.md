📊 Graph Data Structure in JavaScript

Une implémentation complète et pédagogique de la structure de données Graph en JavaScript, prenant en charge les graphes orientés et non orientés, avec les algorithmes classiques de parcours DFS et BFS.

Ce projet est conçu à la fois pour l’apprentissage, les tests algorithmiques, et comme base réutilisable dans des projets plus avancés.

🚀 Fonctionnalités

✅ Graphe orienté et non orienté

✅ Représentation par liste d’adjacence

✅ Ajout / suppression de sommets

✅ Ajout / suppression d’arêtes

✅ Vérification de l’existence d’une arête

✅ Parcours :

DFS récursif

DFS itératif (pile)

BFS (file)

✅ Statistiques du graphe :

Nombre de sommets

Nombre d’arêtes

✅ Affichage lisible de la structure du graphe

✅ Jeux de tests inclus

🧠 Structure du Graphe

Le graphe est stocké sous forme de Map :

Map<Vertex, Array<Vertex>>


Exemple :

A -> [B, C]
B -> [A, D]
C -> [A, D, E]

📦 Installation & Utilisation

Aucune dépendance externe n’est requise.

1️⃣ Cloner le projet
git clone https://github.com/votre-username/graph-js.git
cd graph-js

2️⃣ Exécuter le fichier
node graph.js

🧩 Création d’un Graphe
Graphe non orienté
const graph = new Graph(false);

Graphe orienté
const graph = new Graph(true);

🔧 Méthodes Disponibles
➕ Ajout
graph.addVertex('A');
graph.addEdge('A', 'B');

➖ Suppression
graph.removeEdge('A', 'B');
graph.removeVertex('A');

🔍 Vérification
graph.hasEdge('A', 'B'); // true / false

📊 Statistiques
graph.getVertices();      // ['A', 'B', 'C']
graph.getVertexCount();   // Nombre de sommets
graph.getEdgeCount();     // Nombre d’arêtes

🖨️ Affichage
graph.printGraph();

🔎 Parcours du Graphe
DFS (récursif)
graph.dfs('A');
// ➜ ['A', 'B', 'D', 'C', 'E']

DFS (itératif)
graph.dfsIterative('A');

BFS
graph.bfs('A');
// ➜ ['A', 'B', 'C', 'D', 'E']

🧪 Tests Inclus

Le fichier contient 4 scénarios de test :

Graphe non orienté

Graphe orienté

Opérations sur les arêtes

Graphe simple à 3 sommets

Chaque test affiche :

La structure du graphe

Les parcours DFS & BFS

Les statistiques

🎯 Cas d’Utilisation

📚 Apprentissage des structures de données

🧠 Préparation aux entretiens techniques

🗺️ Modélisation de réseaux (routes, relations, dépendances)

🤖 Base pour algorithmes avancés (Dijkstra, A*, cycle detection…)

🛠️ Améliorations Possibles

Pondération des arêtes

Détection de cycles

Algorithme de Dijkstra

Recherche du plus court chemin

Visualisation graphique (Canvas / SVG)

📄 Licence

Ce projet est open-source et libre d’utilisation à des fins pédagogiques et professionnelles.

✨ Happy coding & graph exploring!
