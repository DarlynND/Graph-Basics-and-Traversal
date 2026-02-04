class Graph {
    constructor(isDirected = false) {
        this.adjacencyList = new Map();
        this.isDirected = isDirected;
    }

    // Add a vertex to the graph
    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    // Add an edge between two vertices
    addEdge(vertex1, vertex2) {
        // Add vertices if they don't exist
        this.addVertex(vertex1);
        this.addVertex(vertex2);

        // Add edge from vertex1 to vertex2
        this.adjacencyList.get(vertex1).push(vertex2);

        // If undirected, add edge from vertex2 to vertex1
        if (!this.isDirected) {
            this.adjacencyList.get(vertex2).push(vertex1);
        }
    }

    // Remove an edge between two vertices
    removeEdge(vertex1, vertex2) {
        if (this.adjacencyList.has(vertex1)) {
            this.adjacencyList.set(
                vertex1,
                this.adjacencyList.get(vertex1).filter(v => v !== vertex2)
            );
        }

        // If undirected, remove edge from vertex2 to vertex1
        if (!this.isDirected && this.adjacencyList.has(vertex2)) {
            this.adjacencyList.set(
                vertex2,
                this.adjacencyList.get(vertex2).filter(v => v !== vertex1)
            );
        }
    }

    // Remove a vertex from the graph
    removeVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            return;
        }

        // Remove all edges to this vertex
        for (let v of this.adjacencyList.keys()) {
            this.removeEdge(v, vertex);
        }

        // Remove the vertex itself
        this.adjacencyList.delete(vertex);
    }

    // Check if an edge exists between two vertices
    hasEdge(vertex1, vertex2) {
        if (!this.adjacencyList.has(vertex1)) {
            return false;
        }
        return this.adjacencyList.get(vertex1).includes(vertex2);
    }

    // Print the graph
    printGraph() {
        console.log("\n=== Graph Structure ===");
        console.log(`Type: ${this.isDirected ? 'Directed' : 'Undirected'}`);
        console.log("Adjacency List:");
        
        for (let [vertex, edges] of this.adjacencyList) {
            console.log(`${vertex} -> [${edges.join(', ')}]`);
        }
        console.log("=====================\n");
    }

    // Depth-First Search (DFS) - Recursive approach
    dfs(startVertex) {
        const visited = new Set();
        const result = [];

        const dfsHelper = (vertex) => {
            if (!vertex || visited.has(vertex)) {
                return;
            }

            // Mark as visited and add to result
            visited.add(vertex);
            result.push(vertex);

            // Visit all neighbors
            const neighbors = this.adjacencyList.get(vertex) || [];
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    dfsHelper(neighbor);
                }
            }
        };

        dfsHelper(startVertex);
        return result;
    }

    // Depth-First Search (DFS) - Iterative approach using stack
    dfsIterative(startVertex) {
        if (!this.adjacencyList.has(startVertex)) {
            return [];
        }

        const visited = new Set();
        const result = [];
        const stack = [startVertex];

        while (stack.length > 0) {
            const vertex = stack.pop();

            if (!visited.has(vertex)) {
                visited.add(vertex);
                result.push(vertex);

                // Add neighbors to stack (in reverse order to maintain left-to-right order)
                const neighbors = this.adjacencyList.get(vertex) || [];
                for (let i = neighbors.length - 1; i >= 0; i--) {
                    if (!visited.has(neighbors[i])) {
                        stack.push(neighbors[i]);
                    }
                }
            }
        }

        return result;
    }

    // Breadth-First Search (BFS) - Using queue
    bfs(startVertex) {
        if (!this.adjacencyList.has(startVertex)) {
            return [];
        }

        const visited = new Set();
        const result = [];
        const queue = [startVertex];
        visited.add(startVertex);

        while (queue.length > 0) {
            const vertex = queue.shift();
            result.push(vertex);

            // Visit all neighbors
            const neighbors = this.adjacencyList.get(vertex) || [];
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }

        return result;
    }

    // Get all vertices
    getVertices() {
        return Array.from(this.adjacencyList.keys());
    }

    // Get number of vertices
    getVertexCount() {
        return this.adjacencyList.size;
    }

    // Get number of edges
    getEdgeCount() {
        let count = 0;
        for (let edges of this.adjacencyList.values()) {
            count += edges.length;
        }
        return this.isDirected ? count : count / 2;
    }
}

// ============================================
// TESTING
// ============================================

console.log("╔════════════════════════════════════════╗");
console.log("║   Graph Implementation & Traversal     ║");
console.log("╔════════════════════════════════════════╗\n");

// Test 1: Undirected Graph
console.log("📊 TEST 1: UNDIRECTED GRAPH");
console.log("─".repeat(50));

const undirectedGraph = new Graph(false);

// Add edges (this will automatically add vertices)
undirectedGraph.addEdge('A', 'B');
undirectedGraph.addEdge('A', 'C');
undirectedGraph.addEdge('B', 'D');
undirectedGraph.addEdge('C', 'D');
undirectedGraph.addEdge('C', 'E');
undirectedGraph.addEdge('D', 'E');
undirectedGraph.addEdge('D', 'F');

undirectedGraph.printGraph();

console.log("🔍 DFS Traversal (Recursive) starting from 'A':");
const dfsResult1 = undirectedGraph.dfs('A');
console.log(`Order: ${dfsResult1.join(' -> ')}`);

console.log("\n🔍 DFS Traversal (Iterative) starting from 'A':");
const dfsIterResult1 = undirectedGraph.dfsIterative('A');
console.log(`Order: ${dfsIterResult1.join(' -> ')}`);

console.log("\n🔍 BFS Traversal starting from 'A':");
const bfsResult1 = undirectedGraph.bfs('A');
console.log(`Order: ${bfsResult1.join(' -> ')}`);

console.log("\n📈 Graph Statistics:");
console.log(`Vertices: ${undirectedGraph.getVertexCount()}`);
console.log(`Edges: ${undirectedGraph.getEdgeCount()}`);

// Test 2: Directed Graph
console.log("\n\n📊 TEST 2: DIRECTED GRAPH");
console.log("─".repeat(50));

const directedGraph = new Graph(true);

// Add edges
directedGraph.addEdge(1, 2);
directedGraph.addEdge(1, 3);
directedGraph.addEdge(2, 4);
directedGraph.addEdge(3, 4);
directedGraph.addEdge(3, 5);
directedGraph.addEdge(4, 5);
directedGraph.addEdge(5, 6);

directedGraph.printGraph();

console.log("🔍 DFS Traversal (Recursive) starting from 1:");
const dfsResult2 = directedGraph.dfs(1);
console.log(`Order: ${dfsResult2.join(' -> ')}`);

console.log("\n🔍 BFS Traversal starting from 1:");
const bfsResult2 = directedGraph.bfs(1);
console.log(`Order: ${bfsResult2.join(' -> ')}`);

console.log("\n📈 Graph Statistics:");
console.log(`Vertices: ${directedGraph.getVertexCount()}`);
console.log(`Edges: ${directedGraph.getEdgeCount()}`);

// Test 3: Edge Operations
console.log("\n\n📊 TEST 3: EDGE OPERATIONS");
console.log("─".repeat(50));

const testGraph = new Graph(false);
testGraph.addEdge('X', 'Y');
testGraph.addEdge('Y', 'Z');
testGraph.addEdge('X', 'Z');

console.log("Initial graph:");
testGraph.printGraph();

console.log("✅ Checking if edge exists between X and Y:", testGraph.hasEdge('X', 'Y'));
console.log("✅ Checking if edge exists between X and Z:", testGraph.hasEdge('X', 'Z'));
console.log("❌ Checking if edge exists between Y and X (undirected):", testGraph.hasEdge('Y', 'X'));

console.log("\n🗑️  Removing edge between X and Z...");
testGraph.removeEdge('X', 'Z');
testGraph.printGraph();

console.log("Checking if edge exists between X and Z:", testGraph.hasEdge('X', 'Z'));

// Test 4: Simple 3-vertex graph
console.log("\n📊 TEST 4: SIMPLE 3-VERTEX GRAPH");
console.log("─".repeat(50));

const simpleGraph = new Graph(false);
simpleGraph.addEdge('A', 'B');
simpleGraph.addEdge('B', 'C');
simpleGraph.addEdge('A', 'C');

simpleGraph.printGraph();

console.log("🔍 DFS from 'A':", simpleGraph.dfs('A').join(' -> '));
console.log("🔍 BFS from 'A':", simpleGraph.bfs('A').join(' -> '));

console.log("\n" + "═".repeat(50));
console.log("✨ All tests completed successfully!");
console.log("═".repeat(50));
