from docopt import docopt

__doc__ = """{f}
Usage:
    {f} [-w=<word_list>]... [-d=<data_list>]...
""".format(f=__file__)


def main():
    args = docopt(__doc__)
    print(args)


if __name__ == '__main__':
    main()
