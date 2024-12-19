class Sprite {
    constructor({ position, imageSrc, frameRate = 1, frameCount = 1, isBackground = false }) {
        this.position = position || { x: 0, y: 0 };
        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true;

            if (isBackground) {
                // Dynamically resize the canvas to match the background's aspect ratio
                const imageAspectRatio = this.image.width / this.image.height;
                canvas.width = window.innerWidth; // Full screen width
                canvas.height = canvas.width / imageAspectRatio; // Adjust height based on aspect ratio

                if (canvas.height > window.innerHeight) {
                    // Adjust width if height exceeds viewport
                    canvas.height = window.innerHeight;
                    canvas.width = canvas.height * imageAspectRatio;
                }

                console.log("Canvas resized for background:", canvas.width, canvas.height);
            }

            this.frameWidth = this.image.width / frameCount; // Width of one frame
            this.frameHeight = this.image.height; // Full height of the sprite
        };
        this.image.src = imageSrc;
        this.loaded = false;
        this.frameRate = frameRate; // Frames per animation update
        this.frameCount = frameCount; // Total frames in the sprite sheet
        this.currentFrame = 0;
        this.frameElapsed = 0;
        this.isBackground = isBackground;
    }

    draw() {
        if (!this.loaded) return;

        if (this.isBackground) {
            // Draw background to cover the entire canvas
            c.drawImage(this.image, 0, 0, canvas.width, canvas.height);
        } else {
            // Draw the current frame from the sprite sheet
            const frameX = this.currentFrame * this.frameWidth;
            c.drawImage(
                this.image,
                frameX, 0, // Source X and Y (crop from sprite sheet)
                this.frameWidth, this.frameHeight, // Source width and height
                this.position.x, this.position.y, // Destination X and Y
                this.frameWidth, this.frameHeight // Destination width and height
            );

            // Update animation frames
            this.frameElapsed++;
            if (this.frameElapsed >= this.frameRate) {
                this.currentFrame = (this.currentFrame + 1) % this.frameCount; // Loop through frames
                this.frameElapsed = 0;
            }
        }
    }
}
