public class FactorialCalculator {

    // Iterative method to calculate factorial
    public int factorialIterative(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Input cannot be negative.");
        }
        int result = 1;
        for (int i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // Recursive method to calculate factorial
    public int factorialRecursive(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Input cannot be negative.");
        }
        if (n == 0 || n == 1) {
            return 1;
        }
        return n * factorialRecursive(n - 1);
    }

    public static void main(String[] args) {
        FactorialCalculator calculator = new FactorialCalculator();
        
        // Test the iterative method
        System.out.println("Iterative Factorial of 5: " + calculator.factorialIterative(5));
        
        // Test the recursive method
        System.out.println("Recursive Factorial of 5: " + calculator.factorialRecursive(5));
    }
}
