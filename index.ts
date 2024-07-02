import * as readline from 'readline';
import * as fs from 'fs';

type Rule = {
    word: string;
    trigger_numer: number;
    overwrite: boolean;
    reverse: boolean;
    insert_before: string;
}

function introduce_13(list: string[], word_to_introduce: string, introduce_before: string): void{
    
    let found: boolean;
    for (let i = 0; i < list.length; i++) {
        if(list[i].startsWith(introduce_before)){
            list.splice(i, 0, word_to_introduce);
            found = true;
            break;
        }
    }
    if(!found){
        list.push(word_to_introduce);
    }

}

function fizzbuzz(n: number): void {

    //parse the rules
    let all_rules: Rule[];

    all_rules = JSON.parse(fs.readFileSync('fizzbuzz_rules.json', 'utf-8'));

    let rules: Rule[] = [];

    console.log("Activated rules are: ");

    for(let i = 0; i < process.argv.length; i++){
        for(let j = 0; j < all_rules.length; j++){
            if(process.argv[i] === `${all_rules[j].trigger_numer}`){
                console.log(`Rule ${all_rules[j]}`);
                rules.push(all_rules[j]);
                break;
            }
        }
    }


    let texts : string[] = [];
    for (let i = 1; i <= n; i++) {
        texts = [];

        let respects_rule: boolean = false;

        for(let j = 0; j < rules.length; j++){
            if(i % rules[j].trigger_numer === 0){
                respects_rule = true;

                if(rules[j].overwrite){                    
                    texts.splice(0, texts.length);
                }

                if(rules[j].insert_before !== "None"){
                    introduce_13(texts, rules[j].word,rules[j].insert_before);
                }else if (rules[j].word != ""){
                    texts.push(rules[j].word);
                }

                if(rules[j].reverse){
                    texts.reverse();
                }

            }

        }

        if(!respects_rule || texts.length === 0){
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


main();