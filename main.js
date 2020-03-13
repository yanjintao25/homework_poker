'use strict';

var card_point = {'2':0, '3':1, '4':2, '5':3,
                '6':4, '7':5, '8':6, '9':7,
                'T':8, 'J':9, 'Q':10, 'K':11, 'A':12};

function get_point(x){
    return card_point[x.substring(0,1)];
}

function quick_sort_card(x, left, right){
    if (right <= left) return;
    var i = left;
    var j = right;
    var key = x[left];
    while(i<j){
        while(i<j && get_point(key)<=get_point(x[j])){
            j = j-1;
        }
        x[i] = x[j];
        while(i<j && get_point(key)>=get_point(x[i])){
            i = i+1;
        }
        x[j] = x[i];
    }
    x[i] = key;
    quick_sort_card(x, left, i-1);
    quick_sort_card(x, i+1, right);
}

function sort_poker(x){
    quick_sort_card(x, 0, x.length-1);
}

function get_suit(x){
    return x.substring(1);
}

function is_two_same_suit(x, y){
    return get_suit(x)==get_suit(y);
}

function is_flush(x){
    return is_two_same_suit(x[0], x[1]) && is_two_same_suit(x[1], x[2]) && is_two_same_suit(x[2], x[3]) && is_two_same_suit(x[3], x[4]);
}


function is_straight(x){
    var result = true;
    for(var i=1; i<5; i++){
        result = result && (get_point(x[i])-get_point(x[i-1])==1);
    }
    return result;
}

function is_straight_flush(x){
    return is_flush(x) && is_straight(x);
}

function get_sum_value(x){
    var result = 0;
    for(var i=0; i<5; i++){
        result = result + get_point(x[i]);
    }
    return result;
}

function is_four_of_a_kind(x){
    var count = 1;
    for(var i=1; i<5; i++){
        if (get_point(x[0])==get_point(x[i])) count = count + 1;
    }
    if (count == 4) return true;
    else count = 1;
    for(var i=2; i<5; i++){
        if (get_point(x[1])==get_point(x[i])) count = count + 1;
    }
    if (count == 4) return true;
    else return false;
}

function get_value_of_four_kind(x){
    var count = 1;
    for(var i=1; i<5; i++){
        if (get_point(x[0])==get_point(x[i])) count = count + 1;
    }
    if (count == 4) return get_point(x[0]);
    else return get_point(x[1]);
}

// function get_all_point(x){
//     var points = new Array(13);
//     for(var i=0; i<5; i++){
//         var index = get_point(x[i]);
//         if(points[index]) points[i] = points[i] + 1;
//         else points[i] = 1;
//     }
//     return points;
// }

function is_three_of_a_kind(x){
    var result = new Array()
    var key = get_point(x[2]);
    if (key==get_point(x[0]) || key==get_point(x[4])){
        result.push(true);
        result.push(key);
    }
    else if(get_point(x[1])==get_point(x[3])){
        result.push(true);
        result.push(get_point(x[1]));
    }
    return result;
}

function is_one_pair(x){
    var result = new Array()
    for (var i=1; i<5; i++){
        if(get_point(x[i])==get_point(x[i-1])){
            result.push(true);
            result.push(get_point(x[i]));
            break;
        }
    }
    return result;
}


function compare_poker(x){
    // return 0;
    var black_cards = x.split(' ').slice(1, 6);
    var white_cards = x.split(' ').slice(7, 12);
    
    console.log(black_cards, white_cards);
    sort_poker(white_cards);
    sort_poker(black_cards);
    console.log(black_cards, white_cards);
    // Straight flush
    var is_black_straight_flush = is_straight_flush(black_cards);
    var is_white_straight_flush = is_straight_flush(white_cards);
    if (is_black_straight_flush && (!is_white_straight_flush)) return 'Black wins';
    if (is_white_straight_flush && (!is_black_straight_flush)) return 'White wins';
    var white_value = get_sum_value(white_cards);
    var black_value = get_sum_value(black_cards);
    console.log(white_value, black_value);
    if (is_white_straight_flush && is_black_straight_flush){
        if(white_value>black_value){
            return 'White wins';
        }
        else if(white_value<black_value){
            return 'Black wins';
        }
        else{
            return 'Tie';
        }
    }
    // Four of a kind
    var is_black_four_of_a_kind = is_four_of_a_kind(black_cards);
    var is_white_four_of_a_kind = is_four_of_a_kind(white_cards);
    if (is_black_four_of_a_kind && (!is_white_four_of_a_kind)) return 'Black wins';
    if (is_white_four_of_a_kind && (!is_black_four_of_a_kind)) return 'White wins';
    if (is_white_four_of_a_kind && is_black_four_of_a_kind){
        var white_value_of_four_kind = get_value_of_four_kind(white_cards);
        var black_value_of_four_kind = get_value_of_four_kind(black_cards);
        if(white_value_of_four_kind>black_value_of_four_kind){
            return 'White wins';
        }
        else if(white_value_of_four_kind<black_value_of_four_kind){
            return 'Black wins';
        }
        else{
            return 'Tie';
        }
    }
    // Full House
    var black_has_three_of_a_kind = is_three_of_a_kind(black_cards);
    var white_has_three_of_a_kind = is_three_of_a_kind(white_cards);
    var black_has_one_pair = is_one_pair(black_cards);
    var white_has_one_pair = is_one_pair(white_cards);
    var is_black_full_house = black_has_three_of_a_kind[0] && black_has_one_pair[0];
    var is_white_full_house = white_has_three_of_a_kind[0] && white_has_one_pair[0];
    // console.log(black_has_three_of_a_kind, white_has_three_of_a_kind);
    if (is_black_full_house && (!is_white_full_house)) return 'Black wins';
    if (is_white_full_house && (!is_black_full_house)) return 'White wins';
    if (is_white_full_house && is_black_full_house){
        if(white_has_three_of_a_kind[1]>black_has_three_of_a_kind[1]){
            return 'White wins';
        }
        else if(white_has_three_of_a_kind[1]<black_has_three_of_a_kind[1]){
            return 'Black wins';
        }
        else if(white_has_one_pair[1]>black_has_one_pair[1]){
            return 'White wins';
        }
        else if(white_has_one_pair[1]<black_has_one_pair[1]){
            return 'Black wins';
        }
        else{
            return 'Tie';
        }
    }
}

module.exports = compare_poker;

var a=compare_poker("Black: 2H 2H 2H AH AH White: 9S 7S 9S TS 9S");
console.log(a)
// sort_poker("Black: 2H 4S 4C 2D 4H White: 2S 8S AS QS 3S");