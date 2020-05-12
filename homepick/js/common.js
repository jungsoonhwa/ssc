function inArray(needle, haystack) {
    var len = haystack.length;
    for (var i = 0; i < len; i++)
        if (haystack[i] == needle) return true;
    return false;
}