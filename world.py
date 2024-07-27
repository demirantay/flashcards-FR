class World:
    def __init__(self):
        self.blocks = []

    def add_block(self, position, block_type):
        self.blocks.append(Block(position, block_type))

    def render(self, screen):
        for block in self.blocks:
            # Render block based on position and type