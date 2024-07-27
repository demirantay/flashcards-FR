# main.py

import pygame
import sys

# Initialize Pygame
pygame.init()

# Set up display
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Demir's World")

# Set up colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

# Main game loop
def main():
    clock = pygame.time.Clock()
    running = True

    while running:
        # Event handling
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        # Game logic and updates go here

        # Draw everything
        screen.fill(BLACK)
        # Draw other game elements here
        pygame.display.flip()

        # Cap the frame rate
        clock.tick(60)

    # Quit Pygame
    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
