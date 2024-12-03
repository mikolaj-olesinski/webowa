var count = 0;

function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function guessMonth() 
{
    const months = [
        "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", 
        "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
    ];

    const randomMonth = months[getRandomInt(0, 11)];
    let tries = 3;
    let guess;

    while (tries > 0) {
        guess = window.prompt("Zgadnij wylosowany miesiąc (np. Styczeń):");

        if (months.includes(guess)) {
            if (guess === randomMonth) {
                window.alert("Brawo! Odgadłeś miesiąc.");
                document.getElementById("output").innerHTML = "Brawo! Odgadłeś miesiąc " + randomMonth;
                return;
            } else {
                tries--;
                window.alert(`Źle! Pozostało prób: ${tries}`);
            }
        } else {
            window.alert("Nie ma takiego miesiąca.");
        }
    }
    document.getElementById("output").innerHTML = `Przegrałeś. Wylosowany miesiąc to: ${randomMonth}`;
    window.alert(`Przegrałeś. Wylosowany miesiąc to: ${randomMonth}`);
}


function threeAttemptNumberGuess() {
    const number = getRandomInt(1, 100);
    let tries = 3;
    let guess;

    while (tries > 0) {
        guess = parseInt(window.prompt("Zgadnij liczbę (1-100):"), 10);
        if (guess === number) {
            window.alert("Brawo! Odgadłeś liczbę.");
            return;
        } else {
            tries--;
            let hint = guess < number ? "za mała" : "za duża";
            window.alert(`Źle! Twoja liczba jest ${hint}. Pozostało prób: ${tries}`);
        }
    }
    window.alert(`Przegrałeś. Wylosowana liczba to: ${number}`);
}


function numberGuessingGame() {
    const number = getRandomInt(1, 100);
    const maxTries = parseInt(window.prompt("Podaj liczbę prób:"), 10);
    let tries = maxTries;
    let guess;
    let history = [];

    while (tries > 0) {
        guess = parseInt(window.prompt("Zgadnij liczbę (1-100):"), 10);
        history.push(guess);

        if (guess === number) {
            window.alert("Brawo! Odgadłeś liczbę.");
            return;
        } else {
            tries--;
            let hint = guess < number ? "za mała" : "za duża";
            window.alert(`Źle! Twoja liczba jest ${hint}. Pozostało prób: ${tries}\nTwoje dotychczasowe próby: ${history.join(", ")}`);
        }
    }
    window.alert(`Przegrałeś. Wylosowana liczba to: ${number}`);
}


function calculateSumOfNumbers() {
    const n = parseInt(window.prompt("Ile liczb chcesz podać?"), 10);
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        const num = parseFloat(window.prompt(`Podaj liczbę ${i}: Dotychczasowa suma: ${sum}`));
        sum += num;
    }

    window.alert(`Suma podanych liczb wynosi: ${sum}`);
    document.getElementById("output").innerHTML = `Suma podanych liczb wynosi: ${sum}`;
}


function counter() {
    count++;
    document.getElementById("licznik_output").innerHTML = `Licznik: ${count}`;
}


function countCharacters() {
    const sentence = window.prompt("Podaj zdanie, a ja policzę znaki:");
    const length = sentence.length;2
    document.writeln(`Liczba znaków w zdaniu: ${length}`);
}


function convertCelsiusToFahrenheit() {
    const celsius = parseFloat(window.prompt("Podaj temperaturę w Celsjuszach:"));
    const fahrenheit = Math.floor(celsius * 9 / 5 + 32);

    window.alert(`${celsius}°C to ${fahrenheit}°F`);
    document.getElementById("output").innerHTML = `${celsius}°C to ${fahrenheit}°F`;
}


function play_rock_paper_scissors() {
    const choices = ["papier", "kamień", "nożyce"];
    const playerChoice = window.prompt("Wybierz: papier, kamień, nożyce:");
    const computerChoice = choices[getRandomInt(0, 2)];

    if (!choices.includes(playerChoice)) {
        window.alert("Niepoprawny wybór.");
        return;
    }

    if (playerChoice === computerChoice) {
        window.alert(`Remis! Komputer wybrał: ${computerChoice}`);
    } else if (
        (playerChoice === "papier" && computerChoice === "kamień") ||
        (playerChoice === "kamień" && computerChoice === "nożyce") ||
        (playerChoice === "nożyce" && computerChoice === "papier")
    ) {
        window.alert(`Wygrałeś! Komputer wybrał: ${computerChoice}`);
    } else {
        window.alert(`Przegrałeś! Komputer wybrał: ${computerChoice}`);
    }
}

function simple_calculator()
{
    let a = parseFloat(window.prompt("Podaj pierwszą liczbę:"));
    let b = parseFloat(window.prompt("Podaj drugą liczbę:"));
    let operation = window.prompt("Podaj operację (+, -, *, /):");

    let result;
    switch (operation) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            result = a / b;
            break;
        default:
            window.alert("Niepoprawna operacja.");
            return;
    }

    window.alert(`Wynik: ${result}`);
    document.getElementById("output").innerHTML = `Wynik: ${a} ${operation} ${b} = ${result}`;
}



document.getElementById("game1").addEventListener("click", guessMonth);
document.getElementById("game2").addEventListener("click", threeAttemptNumberGuess);
document.getElementById("game3").addEventListener("click", numberGuessingGame);
document.getElementById("game4").addEventListener("click", calculateSumOfNumbers);
document.getElementById("counter").addEventListener("click", counter);
document.getElementById("charCounter").addEventListener("click", countCharacters);
document.getElementById("tempConverter").addEventListener("click", convertCelsiusToFahrenheit);
document.getElementById("game5").addEventListener("click", play_rock_paper_scissors);
document.getElementById("calc").addEventListener("click", simple_calculator);

window.addEventListener('keydown', function(event) {
    console.log('Naciśnięto klawisz: ' + event.key);
});
