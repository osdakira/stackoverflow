import os

def asxmake(srcDir):
    for sub in os.listdir(srcDir):
        newSrcPath = os.path.join(srcDir, sub)
        if os.path.isdir(newSrcPath):
            f = open(AsxMake, 'a+')
            print(sub, file=f)
            f.flush()
            print(sub)
            asxmake(newSrcPath)
        else:
            f = open(AsxMake, 'a+')
            file = sub.replace('/','\\')
            filename = os.path.basename(file)
            print(sub, file=f)
            f.flush()
            print(sub)

srcDir = 'test'
AsxMakefol = 'test'
AsxMake = 'test/1.asx'
asxmake(srcDir)
