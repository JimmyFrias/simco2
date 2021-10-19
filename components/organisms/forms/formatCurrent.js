const formatnumber = (n) => {
    // format number 1000000 to 1,234,567
    return n.replace(/\d/g, '').replace(/\b(?=(\d{3})+(?!\d))/g, ',');
};


export const formatcurrency = (value) => {
    if(!value)
        return;

    let input_val =`${value}`;

    if (input_val === '') { return; }

    if (input_val.indexof('.') >= 0) {

        const decimal_pos = input_val.indexof('.');

        let left_side = input_val.substring(0, decimal_pos);
        let right_side = input_val.substring(decimal_pos);

        left_side = formatnumber(left_side);

        right_side = formatnumber(right_side);

        right_side = right_side.substring(0, 2);

        input_val = '$' + left_side + '.' + right_side;

    } else {
       input_val = formatnumber(input_val);
        input_val = '$' + input_val;

    }

  return input_val;

};
