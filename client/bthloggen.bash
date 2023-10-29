#!/usr/bin/env bash

#
# Bth loggen command line client
#
# Exit values:
#  0 on success
#  1 on failure
#

#
# Name of the script
#
SCRIPT=$( basename "$0" )

#
# Current version
#
VERSION="1.0.0"

#
# create the initial server.txt file
# if it doesn't exist
#
if [[ ! -a "server.txt" ]]; then
    echo "server" > server.txt
fi

#
# Url to server in the container
#
URL="$(cat ./server.txt):1337"

#
# For temporarily storing
# the result from server
#
RESULT=${RESULT:-""}

#
# Coloring for the output
#
YELLOW="\033[1;33m"
RED="\033[1;31m"
PURPLE="\033[1;35m"
NC="\033[0m"

#
# Message displayed in -h | --help option
#
function usage
{
    local txt=(
        ""
        "Utility $SCRIPT for 'bthloggen' command line client"
        ""
        "Usage:"
        "./$SCRIPT [option] <command> [arguments]"
        ""
        "Commands available:"
        ""
        "url                                            Get url to view the server in browser."
        "view                                           View all entries."
        "view url <url>                                 View all entries containing <url>."
        "view ip <ip>                                   View all entries containing <ip>."
        "view month <month>                             View all entries containing <month>."
        "view day <day>                                 View all entries containing <day>."
        "view time <time>                               View all entries containing <time>."
        "view day <day> time <time>                     View all entries containing <day> and <time>."
        "view month <month> day <day> time <time>       View all entries containing <month>, <day> and <time>."
        "use <server>                                   Set the servername (localhost or service name)."
        ""
        ""
        "Options available:"
        ""
        "-h, --help                                     Display the menu"
        "-v, --version                                  Display the current version"
        "-c, --count                                    Display the number of rows returned"
        ""
    )

    printf "$YELLOW%s\\n$NC" "${txt[@]}"
    exit 0
}

#
# Message to display for version.
#
function version
{
    printf "$PURPLE%s ./%s \\nVersion: %s\\n$NC" "Scriptname:" "$SCRIPT" $VERSION
    exit 0
}

#
# Message to display when bad usage.
#
function badUsage
{
    local message="$1"
    local txt=(
        "For an overview of the commands and options, execute:"
        "$SCRIPT --help "
    )

    [[ -n $message ]] && printf "$RED%s$NC\\n" "$message"

    printf "$RED%s$NC\\n" "${txt[@]}"
    exit 1
}

#
# Sub-function for the view command
# queries server for data
#
function app-search
{
    local combo="$*"
    shift
    query=$(echo "$@" | sed "s/\s/\//g")
    RESULT="$(curl --silent "$URL/data/$query")"
    if [[ ! $RESULT ]];
    then
        printf "$RED%s$NC\\n" "Could not connect to $URL"
        exit 1
    fi
    if grep -q "Error" <<< "$RESULT"
    then
        badUsage "'$combo' is not a valid combination"
    fi
}

#
# Calls app-search to get
# data from server and then returns
# count of entries
#
function app-count
{

    shift
    app-search "$@"
    printf "$PURPLE%d$NC\\n" "$(echo "$RESULT" | jq length)"
    exit 0
}

#
# Calls app-search to get
# data from server and
# pretty prints the result
#
function app-view
{
    app-search "$@"
    echo "$RESULT" | jq -M
    exit 0
}

#
# Switches server
#
function app-use
{
    echo "$2" > "./server.txt"
    printf "$PURPLE%s %s \\n$NC" "Server is now:" "$2"
    exit 0
}

#
# Url to access server from the local machine
#
function app-url
{
    printf "$YELLOW%s: $PURPLE%s\\n$YELLOW%s: $PURPLE%s$NC\\n" \
    "server" \
    "http://localhost:1337" \
    "webclient" \
    "http://localhost:1338"
    exit 0
}


#
# Main
#
function main {
#
# Process options
#
    while (( $# ))
    do
        case "$1" in

            --help | -h)
                usage
            ;;

            --version | -v)
                version
            ;;

            --count | -c)
                app-count "$@"
            ;;

            view | use)
                app-"$1" "$@"
            ;;

            url)
                app-url
            ;;

            *)
                badUsage "Option/command not recognized"
            ;;
        esac
    done

    badUsage
}


main "$@"

