#!/usr/bin/env awk

BEGIN {
    FS=","
    printf "{\n\t\"data\": [\n"
}

{
    comma = ""
    if (NR > 1) {
        print ","
    }
    printf "\t\t{\n\t\t\t\"ip\": \"%s\",\n\t\t\t\"day\": \"%s\",\n\t\t\t\"month\": \"%s\",\n\t\t\t\"time\": \"%s\",\n\t\t\t\"url\": \"%s\"\n\t\t}", $1, $2, $3, $4, $5
}

END {
    print "\n\t]\n}"
}