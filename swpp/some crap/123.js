var str = '1 > 2 > 3 > 2 > 5'.replace(/[\s>]/g, ''),
    arr = [],
    splitted = str.split(''),
    cnt = 0,
    result = '';

for(i in splitted) {
    letter = splitted[i];
    if(typeof(arr[letter])=='undefined') arr[letter]=0;
    arr[letter]++;
}

for(i in arr) {
    if(arr[i] > cnt) {
        cnt=arr[i];
        result=i;
    }
}

console.log('Result: letter "'+result+'" found '+cnt+' times in string '+str);