import * as readline from 'readline';

function introduce_13(list: string[]): void{
    
    let found: boolean;
    for (let i = 0; i < list.length; i++) {
        if(list[i].startsWith("B")){
            list.splice(i, 0, "Fezz");
            found = true;
            break;
        }
    }
    if(!found){
        list.push("Fezz");
    }

}
// This is our main function
function fizzbuzz(n: number): void {

    let check_fizz: boolean = false, check_buzz: boolean = false,check_bang: boolean = false,check_bong: boolean = false,check_fezz: boolean = false, check_reverse: boolean = false;

    for(let i = 0; i < process.argv.length; i++){
        switch(process.argv[i]){
            case "Fizz":
                check_fizz = true;
                break;
            case "Buzz":
                check_buzz = true;
                break;
            case "Bang":
                check_bang = true;
                break;
            case "Bong":
                check_bong = true;
                break;
            case "Fezz":
                check_fezz = true;
                break;
            case "Reverse":
                check_reverse = true;
                break;
        }
    }

    let texts : string[] = [];
    for (let i = 1; i <= n; i++) {
        texts = [];
        if(check_fizz && i % 3 === 0){
            texts.push("Fizz");
        }
        if(check_buzz && i % 5 === 0){
            texts.push("Buzz");
        }
        if(check_bang && i % 7 === 0){
            texts.push("Bang");
        }
        if(check_bong && i % 11 === 0){
            texts.push("Bong");
        }
        if(check_fezz && i % 13 === 0){
            introduce_13(texts);
        }
        if(check_reverse && i % 17 == 0){
            texts.reverse();
        }
        
        if(texts.length === 0){
            console.log(i);
        }else{
            let text_actual: string = "";
            for (let i = 0; i < texts.length; i++) {
                text_actual += texts[i];
            }
            console.log(text_actual);
        }
    }
}
function main(): void{
    const rd_line = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    let n: number;
    rd_line.question("Insert the target max number:", (answer)=>{ 
        n = Number(answer);
        if(isNaN(n)){
            n = 100;
        }

        fizzbuzz(n);

        rd_line.close();
     })
}
// Now, we run the main function:
main();