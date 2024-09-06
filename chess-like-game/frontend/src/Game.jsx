// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types'; 
// import GameBoard from './components/GameBoard';

// const Game = ({ socket }) => {
//     const { roomId } = useParams();
//     const [gameState, setGameState] = useState(null);
//     const [player, setPlayer] = useState(null);
//     const [currentPlayer, setCurrentPlayer] = useState('A');
//     const [error, setError] = useState('');
//     const [waitingForPlayer, setWaitingForPlayer] = useState(false);

//     useEffect(() => {
//         if (socket) {
//             socket.on('startGame', (data) => {
//                 console.log('Game starting with initial state:', data.initialState);
//                 setGameState(data.initialState.gameState);
//                 setCurrentPlayer(data.initialState.currentPlayer);
//                 setWaitingForPlayer(false);
//                 setPlayer(data.players[0] === socket.id ? 'A' : 'B');
//             });

//             socket.on('waitingForPlayer', (data) => {
//                 console.log(data.message);
//                 setWaitingForPlayer(true);
//                 setError(data.message);
//             });

//             // Handle receiving the game state
//             socket.on('updateGameState', ({ gameState, currentPlayer }) => {
//                 console.log('Game state received:', gameState);
//                 setGameState(gameState);
//                 setCurrentPlayer(currentPlayer);
//             });

//             // Handle receiving the current player update
//             socket.on('updateCurrentPlayer', ({ currentPlayer }) => {
//                 console.log('Current player is now:', currentPlayer);
//                 setCurrentPlayer(currentPlayer);
//             });



//             socket.on('gameOver', ({ winner }) => {
//                 alert(`Game over! Player ${winner} wins!`);
//             });

//             socket.on('invalidMove', ({ message }) => {
//                 alert(message);
//             });

//             socket.on('playerLeft', ({ message }) => {
//                 alert(message);
//             });

//             socket.on('error', (message) => {
//                 setError(message);
//             });

//             socket.emit('joinRoom', roomId, (response) => {
//                 const { error, player } = response;
//                 if (error) {
//                     setError(error);
//                 } else {
//                     setPlayer(player);
//                 }
//             });

//             return () => {
//                 socket.off('startGame');
//                 socket.off('waitingForPlayer');
//                 socket.off('updateGameState');
//                 socket.off('gameOver');
//                 socket.off('invalidMove');
//                 socket.off('playerLeft');
//                 socket.off('error');
//             };
//         }
//     }, [socket, roomId]);
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
    
//         // Emit the move
//         socket.emit('makeMove', {
//             roomId: roomId,
//             from: startPosition,
//             to: endPosition,
//             player: currentPlayer
//         });
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

//     return (
//         <div>
//             <div style={{ marginTop: '50px' }}>
//                 <h5>Room ID: {roomId}</h5>
//             </div>

//             {/* Show the error message only if the game hasn't started yet */}
//             {gameState === null && error && <p style={{ color: 'red' }}>{error}</p>}
//             {waitingForPlayer ? (
//                 <p>Waiting for another player to join...</p>
//             ) : gameState ? (
//                 <GameBoard gameState={gameState} onMove={handleMove} />
//             ) : (
//                 <p>Loading game...</p>
//             )}
//         </div>
//     );
// };

// Game.propTypes = {
//     socket: PropTypes.object.isRequired,
// };

// export default Game;
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import GameBoard from './components/GameBoard';

const Game = ({ socket }) => {
    const { roomId } = useParams();
    const [gameState, setGameState] = useState(null);
    const [player, setPlayer] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState('A');
    const [error, setError] = useState('');
    const [waitingForPlayer, setWaitingForPlayer] = useState(false);

    useEffect(() => {
        if (socket) {
            socket.on('message', (message) => {
        console.log('Message:', message);
    });

    socket.on('connect', () => {
        console.log('New client connected:', socket.id);
    
        socket.on('message', (message) => {
            console.log('Message:', message);
        });
    
        console.log('Emitting welcome message');
        socket.emit('message', 'Welcome to the client!');
    });
            socket.on('startGame', (data) => {
                console.log('Game starting with initial state:', data.initialState);
                setGameState(data.initialState.gameState);
                setCurrentPlayer(data.initialState.currentPlayer);
                setWaitingForPlayer(false);
                setPlayer(data.players[0] === socket.id ? 'A' : 'B');
            });

            socket.on('waitingForPlayer', (data) => {
                console.log(data.message);
                setWaitingForPlayer(true);
                setError(data.message);
            });

            socket.on('updateGameState', ({ gameState, currentPlayer }) => {
                console.log('Game state received:', gameState);
                setGameState(gameState);
                setCurrentPlayer(currentPlayer);
            });

            socket.on('gameOver', ({ winner }) => {
                alert(`Game over! Player ${winner} wins!`);
            });

            socket.on('invalidMove', ({ message }) => {
                alert(message);
            });

            socket.on('playerLeft', ({ message }) => {
                alert(message);
            });

            socket.on('error', (message) => {
                setError(message);
            });

            socket.emit('joinRoom', roomId, (response) => {
                const { error, player } = response;
                if (error) {
                    setError(error);
                } else {
                    setPlayer(player);
                }
            });

            return () => {
                socket.off('startGame');
                socket.off('waitingForPlayer');
                socket.off('updateGameState');
                socket.off('gameOver');
                socket.off('invalidMove');
                socket.off('playerLeft');
                socket.off('error');
            };
        }
    }, [socket, roomId]);

    function handleMove(startPosition, endPosition) {
        console.log("Attempting move:");
        console.log("Start Position:", startPosition);
        console.log("End Position:", endPosition);
    
        // Validate move positions
        if (!startPosition || !endPosition) {
            console.error("Move positions are undefined");
            return;
        }
    
        // Ensure it's the correct player's turn
        if (currentPlayer !== player) {
            alert("It's not your turn!");
            return;
        }
    
        // Retrieve the character at the start position
        const character = gameState[startPosition];
        if (!character) {
            console.error("Invalid move: No character at startPosition.");
            return;
        }
    
        if (character.player !== player) {
            console.error("Invalid move: This is not your piece.");
            return;
        }
    
        // Log character details for debugging
        console.log("Character being moved:", character);
    
        // Emit the move to the server
        socket.emit('makeMove', {
            roomId: roomId,
            from: startPosition,
            to: endPosition,
            player: currentPlayer
        });
    
        // Log the data being sent for debugging
        console.log("Emitting move:", {
            roomId: roomId,
            from: startPosition,
            to: endPosition,
            player: currentPlayer
        });
    
        // Update local game state (this can be modified based on your game logic)
        const newGameState = { ...gameState };
        newGameState[endPosition] = newGameState[startPosition];
        delete newGameState[startPosition];
    
        setGameState(newGameState);
        setCurrentPlayer(currentPlayer === 'A' ? 'B' : 'A');
    }
    

    return (
        <div>
            <div style={{ marginTop: '50px' }}>
                <h5>Room ID: {roomId}</h5>
            </div>

            {gameState === null && error && <p style={{ color: 'red' }}>{error}</p>}
            {waitingForPlayer ? (
                <p>Waiting for another player to join...</p>
            ) : gameState ? (
                <GameBoard gameState={gameState} onMove={handleMove} />
            ) : (
                <p>Loading game...</p>
            )}
        </div>
    );
};

Game.propTypes = {
    socket: PropTypes.object.isRequired,
};

export default Game;