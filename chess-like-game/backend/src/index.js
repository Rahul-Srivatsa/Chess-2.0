// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('../src/middlewares/cors'); // Import the CORS middleware

// const app = express();
// app.use(cors); // Use the CORS middleware   
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: 'http://localhost:5173', // Adjust to your React frontend URL
//         methods: ['GET', 'POST'],
//         credentials: true,
//     }
// });

// let rooms = {}; // Stores room data, including players and game state
// io.on('connection', (socket) => {
//     console.log('New client connected:', socket.id);

//     socket.on('createRoom', (callback) => {
//         const roomId = `room_${Math.random().toString(36).substring(2, 15)}`;
//         rooms[roomId] = [socket.id]; // Initialize room with one player
//         socket.join(roomId);
//         console.log(`Room created: ${roomId}, Player: ${socket.id}`);
//         console.log('Rooms:', rooms);
//         callback({ roomId, player: socket.id });
//     });

//     function handleMove(startPosition, endPosition) {
//         console.log("Attempting move:");
//         console.log("Start Position:", startPosition);
//         console.log("End Position:", endPosition);
    
//         if (!startPosition || !endPosition) {
//             console.error("Move positions are undefined");
//             return;
//         }
    
//         if (currentPlayer !== player) {
//             alert("It's not your turn!");
//             return;
//         }
    
//         const character = gameState[startPosition];
//         if (!character || character.player !== player) {
//             console.error("Invalid move: No character at startPosition or not your piece.");
//             return;
//         }
    
//         const newGameState = { ...gameState };
//         newGameState[endPosition] = newGameState[startPosition];
//         delete newGameState[startPosition];
    
//         console.log("Updated gameState:", newGameState);
    
//         // Emit the move
//         socket.emit('makeMove', {
//             roomId: roomId,
//             from: startPosition,
//             to: endPosition,
//             player: currentPlayer, // Make sure this is correctly set
//         });
        
//         setGameState(newGameState);
//         setCurrentPlayer(currentPlayer === 'A' ? 'B' : 'A');
//     }
    

//     socket.on('makeMove', ({ roomId, from, to, player }) => {
//         console.log(`Move received from player ${player}: ${from} to ${to}`);
    
//         if (!rooms[roomId]) {
//             console.error(`Room ${roomId} does not exist`);
//             return;
//         }
    
//         if (!from || !to || !player) {
//             console.error('Invalid move data received');
//             return;
//         }
    
//         const room = rooms[roomId];
//         const currentPlayer = room.currentPlayer;
    
//         // Process the move
//         const updatedGameState = handleMove(room.gameState, from, to, player);
    
//         if (updatedGameState) {
//             room.gameState = updatedGameState;
//             room.currentPlayer = player === 'A' ? 'B' : 'A';
    
//             io.to(roomId).emit('updateGameState', {
//                 gameState: room.gameState,
//                 currentPlayer: room.currentPlayer,
//             });
    
//             console.log(`Game state updated for room ${roomId}. Next player is ${room.currentPlayer}`);
//         } else {
//             console.error('Move was invalid, no update made.');
//         }
//     });
    
    
    
    
    


// // Adjust the logic when a player joins a room
// socket.on('joinRoom', (roomId, callback) => {
//     console.log(`Player ${socket.id} attempting to join room ${roomId}`);

//     if (!rooms[roomId]) {
//         console.log(`Room ${roomId} does not exist`);
//         return callback({ error: 'Room does not exist' });
//     }

//     if (rooms[roomId].length === 2) {
//         console.log(`Room ${roomId} is full`);
//         const initialState = initializeGame();
//         rooms[roomId].gameState = initialState.gameState; // Store the initial game state
//         io.to(roomId).emit('startGame', { initialState, players: rooms[roomId] });
//         console.log(`Game started in room ${roomId} with players:`, rooms[roomId]);
//     }

//     if (rooms[roomId].includes(socket.id)) {
//         console.log(`Player ${socket.id} is already in room ${roomId}`);
//         return callback({ error: 'You are already in this room' });
//     }

//     rooms[roomId].push(socket.id);
//     socket.join(roomId);
//     console.log(`Player ${socket.id} joined room ${roomId}`);
//     console.log('Updated Rooms:', rooms);

//     if (rooms[roomId].length === 2) {
//         const initialState = initializeGame();
//         rooms[roomId].gameState = initialState.gameState; // Store the initial game state
//         io.to(roomId).emit('startGame', { initialState, players: rooms[roomId] });
//         console.log(`Game started in room ${roomId} with initial state:`, initialState);
//     }

//     callback({ roomId, player: socket.id });
// });



//     socket.on('disconnect', () => {
//         console.log('Client disconnected:', socket.id);
//         // Handle room cleanup
//         for (let roomId in rooms) {
//             if (rooms[roomId].includes(socket.id)) {
//                 console.log(`Removing player ${socket.id} from room ${roomId}`);
//                 rooms[roomId] = rooms[roomId].filter(id => id !== socket.id);
//                 if (rooms[roomId].length === 0) {
//                     console.log(`Deleting empty room ${roomId}`);
//                     delete rooms[roomId];
//                 }
//             }
//         }
//         console.log('Updated Rooms after disconnect:', rooms);
//     });
// });

//     function isGameOver(gameState) {
//         // Implement logic to check if the game is over (e.g., no more pieces for one player)
//         return !Object.values(gameState).some(character => character.player === 'B') ||
//                !Object.values(gameState).some(character => character.player === 'A');
//     }

//     // const handleMove = (from, to) => {
//     //     if (currentPlayer === player) {
//     //         const oldPosition = from;
//     //         const newPosition = to;
//     //         // Assuming GameBoard or another component provides the updated game state
//     //         socket.emit('makeMove', { roomId, playerId: player, oldPosition, newPosition, captured: null, gameState });
//     //     } else {
//     //         alert("It's not your turn!");
//     //     }
//     // };


    


// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// function initializeGame() {
//     // Create an empty 5x5 grid
//     const grid = Array.from({ length: 5 }, (_, row) =>
//         Array.from({ length: 5 }, (_, col) => `${String.fromCharCode(65 + col)}${row + 1}`)
//     ).flat();

//     // Initialize characters for both players
//     const initialCharacters = {
//         'A1': { type: 'Pawn', player: 'A' },
//         'B1': { type: 'Pawn', player: 'A' },
//         'C1': { type: 'Hero1', player: 'A' },
//         'D1': { type: 'Hero2', player: 'A' },
//         'E1': { type: 'Pawn', player: 'A' },
//         'A5': { type: 'Pawn', player: 'B' },
//         'B5': { type: 'Pawn', player: 'B' },
//         'C5': { type: 'Hero1', player: 'B' },
//         'D5': { type: 'Hero2', player: 'B' },
//         'E5': { type: 'Pawn', player: 'B' }
//     };

//     // Randomly choose who goes first
//     const startingPlayer = Math.random() < 0.5 ? 'A' : 'B';

//     // Return the initial game state
//     return {
//         gameState: initialCharacters,
//         currentPlayer: startingPlayer,
//         moveHistory: [], // Empty at the start
//         grid: grid // Optional: if you want to manage the grid separately
//     };
// }
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('../src/middlewares/cors'); // Import the CORS middleware

const app = express();
app.use(cors); // Use the CORS middleware
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Adjust to your React frontend URL
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

let rooms = {}; // Stores room data, including players and game state

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
    socket.on('message', (message) => {
        console.log('Message:', message);
    });

    socket.emit('message', 'Welcome to the server!');
    socket.on('createRoom', (callback) => {
                const roomId = `room_${Math.random().toString(36).substring(2, 15)}`;
                rooms[roomId] = [socket.id]; // Initialize room with one player
                socket.join(roomId);
                console.log(`Room created: ${roomId}, Player: ${socket.id}`);
                console.log('Rooms:', rooms);
                callback({ roomId, player: socket.id });
            });

            socket.on('joinRoom', (roomId, callback) => {
            console.log(`Player ${socket.id} attempting to join room ${roomId}`);

            if (!rooms[roomId]) {
                console.log(`Room ${roomId} does not exist`);
                return callback({ error: 'Room does not exist' });
            }

            if (rooms[roomId].length === 2) {
                console.log(`Room ${roomId} is full`);
                const initialState = initializeGame();
                rooms[roomId].gameState = initialState.gameState; // Store the initial game state
                io.to(roomId).emit('startGame', { initialState, players: rooms[roomId] });
                console.log(`Game started in room ${roomId} with players:`, rooms[roomId]);
            }

            if (rooms[roomId].includes(socket.id)) {
                console.log(`Player ${socket.id} is already in room ${roomId}`);
                return callback({ error: 'You are already in this room' });
            }

            rooms[roomId].push(socket.id);
            socket.join(roomId);
            console.log(`Player ${socket.id} joined room ${roomId}`);
            console.log('Updated Rooms:', rooms);

            if (rooms[roomId].length === 2) {
                const initialState = initializeGame();
                rooms[roomId].gameState = initialState.gameState; // Store the initial game state
                io.to(roomId).emit('startGame', { initialState, players: rooms[roomId] });
                console.log(`Game started in room ${roomId} with initial state:`, initialState);
            }

            callback({ roomId, player: socket.id });
        });
        function handleMove(startPosition, endPosition) {
            console.log("Attempting move:");
            console.log("Start Position:", startPosition);
            console.log("End Position:", endPosition);
        
            // Check if startPosition and endPosition are valid
            if (!startPosition || !endPosition) {
                console.error("Move positions are undefined");
                return;
            }
        
            // Check if it's the current player's turn
            if (currentPlayer !== player) {
                alert("It's not your turn!");
                return;
            }
        
            // Validate the character at the start position
            const character = gameState[startPosition];
            if (!character || character.player !== player) {
                console.error("Invalid move: No character at startPosition or not your piece.");
                return;
            }
        
            // Emit the move to the server
            console.log('Emitting move:', {
                roomId: roomId,
                from: startPosition,
                to: endPosition,
                player: currentPlayer
            });
            socket.emit('makeMove', {
                roomId: roomId,
                from: startPosition,
                to: endPosition,
                player: currentPlayer
            });
        }
        socket.on('makeMove', ({ roomId, from, to, player }) => {
            console.log(`Move received from player ${player}: ${from} to ${to}`);
        
            if (!rooms[roomId]) {
                console.error(`Room ${roomId} does not exist`);
                return;
            }
        
            const room = rooms[roomId];
            const currentPlayer = room.currentPlayer;
        
            // Check if it's the correct player's turn
            if (player !== currentPlayer) {
                console.error("It's not your turn!");
                return;
            }
        
            // Process the move
            const updatedGameState = handleMove(room.gameState, from, to, player);
        
            if (updatedGameState) {
                room.gameState = updatedGameState;
                room.currentPlayer = player === 'A' ? 'B' : 'A'; // Switch turns
        
                // Emit the updated game state to all players in the room
                io.to(roomId).emit('updateGameState', {
                    gameState: room.gameState,
                    currentPlayer: room.currentPlayer,
                });
        
                console.log(`Game state updated for room ${roomId}. Next player is ${room.currentPlayer}`);
            } else {
                console.error('Move was invalid, no update made.');
            }
        });
        

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        // Handle room cleanup
        for (let roomId in rooms) {
            if (rooms[roomId].players.includes(socket.id)) {
                console.log(`Removing player ${socket.id} from room ${roomId}`);
                rooms[roomId].players = rooms[roomId].players.filter(id => id !== socket.id);
                if (rooms[roomId].players.length === 0) {
                    console.log(`Deleting empty room ${roomId}`);
                    delete rooms[roomId];
                } else if (rooms[roomId].players.length === 1) {
                    // Optionally handle case where only one player remains
                }
            }
        }
        console.log('Updated Rooms after disconnect:', rooms);
    });
});

function initializeGame() {
    // Create an empty 5x5 grid
    const grid = Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => `${String.fromCharCode(65 + col)}${row + 1}`)
    ).flat();

    // Initialize characters for both players
    const initialCharacters = {
        'A1': { type: 'Pawn', player: 'A' },
        'B1': { type: 'Pawn', player: 'A' },
        'C1': { type: 'Hero1', player: 'A' },
        'D1': { type: 'Hero2', player: 'A' },
        'E1': { type: 'Pawn', player: 'A' },
        'A5': { type: 'Pawn', player: 'B' },
        'B5': { type: 'Pawn', player: 'B' },
        'C5': { type: 'Hero1', player: 'B' },
        'D5': { type: 'Hero2', player: 'B' },
        'E5': { type: 'Pawn', player: 'B' }
    };

    // Randomly choose who goes first
    const startingPlayer = Math.random() < 0.5 ? 'A' : 'B';

    // Return the initial game state
    return {
        gameState: initialCharacters,
        currentPlayer: startingPlayer,
        moveHistory: [], // Empty at the start
        grid: grid // Optional: if you want to manage the grid separately
    };
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
