// Pi's home-grown imaginary numbers

class ComplexNumber {
    constructor(real=0, imaginary=0) {
        this.real = real
        this.imaginary = imaginary
    }

    add(num2) {
        return new ComplexNumber(this.real+num2.real, this.imaginary+num2.imaginary)
    }

    mul(num2) {
        return new ComplexNumber(this.real*num2.real - this.imaginary*num2.imaginary,
            this.real*num2.imaginary + this.imaginary*num2.real)
    }

    square() {
        return new ComplexNumber(this.real**2 - this.imaginary**2,
        this.real*this.imaginary*2)
    }
    
    mag() {
        return (this.real**2 + this.imaginary**2)**0.5
    }

    piecewiseAbs() { // defined for the Ship
        return new ComplexNumber(Math.abs(this.real), Math.abs(this.imaginary))
    }
}