import { Controller, Get, Post, Body } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Controller('json')

export class JsonController {
  @Post()
  getFileContent(@Body('letters') letters: string) {
    try {
      console.log(letters)
      const filePath = path.join(__dirname, '../..', 'data.txt');
      const data = fs.readFileSync(filePath, 'utf-8');
      let resultWords: string[] = [];
      const wordsArray = data.split(/\r?\n/); // Split into array of words
      console.log(wordsArray)
      const scrambledLetters = [letters]; // Copy and parse string of letters into array ̰
      console.log(letters.length);
      const matchedWords = wordsArray.filter((word) => {
        let counter = 0;
        console.log(word);
        console.log(word.length);
        console.log(word.split(''));
        const wordLetters = word.split('');
        console.log(wordLetters);
        wordLetters.forEach((letter) => {
          console.log(letter);
          console.log(letters);
          if (letters.includes(letter)) {
              console.log('ok')
              console.log(letter)
              counter++;
              console.log(counter)
          }
        });

        if (counter === word.length) {
          console.log('mot '+word)
          resultWords.push(word);
          console.log(resultWords);
        } 


      });
      console.log("matchedWords "+matchedWords)
      // sort ascending - shorter items first
      console.log(resultWords.sort((a, b) => a.length - b.length));

      // sort descending - longer items first
      console.log(resultWords.sort((a, b) => b.length - a.length));



        return { content: letters };
      } catch (error) {
        return { error: 'An error occurred while reading the file' };
      }
    }

  @Get()
    getJson() {
      const filePath = path.join(__dirname, '..', 'data.txt');
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return { content: fileContent };
      //    return { message: 'Hello, this is a JSON response' };
    }
  }
