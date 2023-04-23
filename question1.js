
// Write a function in JS to find the prime factors of any integer. 
// This function should take an integer as a parameter and should return a list of prime factors for that number. 
// Suggest the time complexity of your written function.


function findPrimeFactors(n) {
    const factors = [];
    
    // Check if 2 is a factor
    while (n % 2 === 0) {
      factors.push(2);
      n = n / 2;
    }
    
    // Check for odd factors up to the square root of n
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      while (n % i === 0) {
        factors.push(i);
        n = n / i;
      }
    }
    
    // If n is still greater than 2, it must be a prime factor
    if (n > 2) {
      factors.push(n);
    }
    
    return factors;
  }