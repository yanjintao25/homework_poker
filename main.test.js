'use strict';

const compare_poker = require('./main.js');

test('test "Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C AH" result', 
    () =>{
    expect(compare_poker('Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C AH')).toBe('White wins');
})

test('test "Black: 2H 4S 4C 2D 4H White: 2S 8S AS QS 3S" result', 
    () =>{
    expect(compare_poker("Black: 2H 4S 4C 2D 4H White: 2S 8S AS QS 3S")).toBe('Black wins');
})

test('test "Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C KH" result', 
    () =>{
    expect(compare_poker("Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C KH")).toBe('Black wins');
})

test('test "Black: 2H 3D 5S 9C KD White: 2D 3H 5C 9S KH" result', 
    () =>{
    expect(compare_poker("Black: 2H 3D 5S 9C KD White: 2D 3H 5C 9S KH")).toBe('Tie');
})