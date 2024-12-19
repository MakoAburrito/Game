const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Create background sprite
const backgroundLevel1 = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: "./Backgrounds/Grandmas_room.png",
    isBackground: true
});

// Create player with sprite sheet
const player = new Player({
    position: { x: 100, y: 100 },
    imageSrc: './Sprites/curly guy 64 x 64 idle v3-Sheet.png',
    frameRate: 15,
    frameCount: 10,
});

// Resize canvas dynamically
window.addEventListener('resize', () => {
    // Resize based on background aspect ratio
    const imageAspectRatio = backgroundLevel1.image.width / backgroundLevel1.image.height;

    canvas.width = window.innerWidth; // Full screen width
    canvas.height = canvas.width / imageAspectRatio; // Adjust height to maintain aspect ratio

    console.log("Canvas resized on window resize:", canvas.width, canvas.height);

    // Update player position to ensure it stays in bounds
    player.updatePositionOnResize();
});

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    d: { pressed: false },
};

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            player.jump();
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});

function animate() {
    window.requestAnimationFrame(animate);

    // Draw background first
    backgroundLevel1.draw();

    // Player horizontal movement
    player.velocity.x = 0;
    if (keys.d.pressed) {
        player.velocity.x = 5;
    } else if (keys.a.pressed) {
        player.velocity.x = -5;
    }

    player.update();
}

animate();
