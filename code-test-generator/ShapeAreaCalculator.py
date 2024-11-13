# ShapeAreaCalculator.py

import math

class ShapeAreaCalculator:
    def __init__(self):
        pass

    def calculate_circle_area(self, radius):
        if radius < 0:
            raise ValueError("Radius cannot be negative")
        return math.pi * radius ** 2

    def calculate_rectangle_area(self, length, width):
        if length < 0 or width < 0:
            raise ValueError("Length and width cannot be negative")
        return length * width

    def calculate_triangle_area(self, base, height):
        if base < 0 or height < 0:
            raise ValueError("Base and height cannot be negative")
        return 0.5 * base * height


# Example usage:
if __name__ == "__main__":
    calculator = ShapeAreaCalculator()
    print("Circle area with radius 5:", calculator.calculate_circle_area(5))
    print("Rectangle area with length 4 and width 3:", calculator.calculate_rectangle_area(4, 3))
    print("Triangle area with base 6 and height 8:", calculator.calculate_triangle_area(6, 8))
