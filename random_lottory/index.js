// 1. deposite some money
// 2. Determine number of lines to bet on
// 3. collect a bet amount
// 4. SPin the slot machine
// 5. check if the user won
// 6. give the user their winnings
// 7. play again 


const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = 
{
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8,
}
//it will be like this
//SYMBOLS_COUNT["A"] -> 2 

const SYMBOLS_VALUES = 
{
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2,
}



const deposite = () =>
{
    while(true)
    {
        const depositeAmount = prompt("Enter A Deposite Amount :- ");
        const numberDepositeAmount = parseFloat(depositeAmount);

        if(isNaN (numberDepositeAmount) || numberDepositeAmount <= 0)
        {
            console.log("Invalid Deposite")
        }
        else
        {
            return numberDepositeAmount;
        }
    }
}

const getNumberOfLines = () =>
{
    while(true)
    {
        const lines = prompt("Enter the lines to bet on from ( 1 - 3 ) :- ");
        const numberOfLines = parseFloat(lines);

        if(isNaN (numberOfLines) || numberOfLines <= 0 || numberOfLines > 3)
        {
            console.log("Invalid Number Of lines , Please try again ! ")
        }
        else
        {
            return numberOfLines;
        }
    }
}

const getBet = (balance,lines) =>
{
    while(true)
    {
        const bet = prompt("Enter the Total bet per Line :- ");
        const numberOfBet = parseFloat(bet);

        if(isNaN (numberOfBet) || numberOfBet <= 0 || numberOfBet > ( balance / lines ))
        {
            console.log("Invalid Bet , Please try again ! ")
        }
        else
        {
            return numberOfBet;
        }
    }
}


const spin = () =>
{
    const symbols = [];

    for( const [symbol , count ] of Object.entries(SYMBOLS_COUNT))
    {
        for(let i=0;i < count ; i++)    // for pushing values into array
        {
            symbols.push(symbol);
        }
    }
    
    const reels = [];   //temp aaray
    for(let i=0 ;i < COLS; i++)
    {
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j=0;j < ROWS; j++)
        {
            const randomIndex =Math.floor(Math.random() * reelSymbols.length);
            const selectedIndex = reelSymbols[randomIndex]; 
            reels[i].push(selectedIndex);
            reelSymbols.splice(randomIndex , 1);    // removing selected symbol
        }
    }
    return reels;
}


const transponse = (reels) =>
{
    const rows = [];

    for(let i=0; i < ROWS ; i++)
    {
        rows.push([]);
        for(let j=0;j<COLS;j++)
        {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) =>
{
    for( const row of rows)
    {
        let rowString ="";
        for(const [i,symbol] of row.entries())
        {
            rowString += symbol;
            if(i != row.length-1)
            {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows , bet , lines) =>
{
    let winnings=0;

    for(let row=0 ; row < lines ;row++)
    {
        const symbols = rows[row];
        let allsame = true;

        for(const symbol of symbols)
        {
            if(symbol != symbols[0])
            {
                allsame = false;
                break;
            }
        }

        if(allsame)
        {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
}

const game = () =>
{
    let balance = deposite();


while(true)
{
    console.log("Your balance is :- ",balance);

    const numberOfLines = getNumberOfLines();
    console.log(numberOfLines);

    const bet = getBet(balance,numberOfLines);
    balance -= bet * numberOfLines;
    console.log(bet);

    const reels= spin();

    const rows = transponse(reels);
    printRows(rows);

    const winnings = getWinnings(rows ,bet ,numberOfLines);

    balance += winnings;

    console.log("You won , $ "+winnings.toString());

    if(balance <= 0)
    {   
        console.log("You ran out of money ");
        break;
    }
    const playAgain = prompt("Do you want to play again (y / n)");
    if(playAgain != "y") break;

    }
}

game();

