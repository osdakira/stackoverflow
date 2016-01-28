def my_cmp(a, b):
    if b == 0:
        return -1
    else:
        return 0

nums = [0,1,0,3,4,5]
nums.sort(cmp=my_cmp)
assert nums == [1, 3, 4, 5, 0, 0]
