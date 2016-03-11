/* gcc -dynamiclib -o libtest.dylib test_library.c */
// #include<stdio.h>
void example(int *a)
{
  for (int i = 0; i < 10; ++i) {
    // printf("%d\n", a[i]);
    a[i] += 1;
  }
}
