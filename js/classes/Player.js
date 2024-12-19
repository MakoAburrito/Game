class Player extends Sprite {
    constructor({ position, imageSrc, frameRate, frameCount }) {
        super({
            position,
            imageSrc,
            frameRate,
            frameCount
        });

        this.velocity = {
            x: 0,
            y: 0,
        };
        this.gravity = 1;

        this.jumps = 0;
        this.maxJumps = 2;

        // Store initial relative position
        this.relativePosition = {
            x: position.x / canvas.width,
            y: position.y / canvas.height,
        };
    }

    update() {
        // Apply physics
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Gravity
        if (this.position.y + this.frameHeight < canvas.height) {
            this.velocity.y += this.gravity;
        } else {
            this.position.y = canvas.height - this.frameHeight;
            this.velocity.y = 0;
            this.jumps = 0;
        }

        // Draw after updating position
        this.draw();

        // Update relative position
        this.relativePosition.x = this.position.x / canvas.width;
        this.relativePosition.y = this.position.y / canvas.height;
    }

    jump() {
        if (this.jumps < this.maxJumps) {
            this.velocity.y = -20;
            this.jumps++;
        }
    }

    updatePositionOnResize() {
        // Recalculate position based on new canvas size
        this.position.x = this.relativePosition.x * canvas.width;
        this.position.y = this.relativePosition.y * canvas.height;

        // Clamp position so the player stays within the canvas
        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x + this.frameWidth > canvas.width) {
            this.position.x = canvas.width - this.frameWidth;
        }
        if (this.position.y < 0) this.position.y = 0;
        if (this.position.y + this.frameHeight > canvas.height) {
            this.position.y = canvas.height - this.frameHeight;
        }
    }
}
