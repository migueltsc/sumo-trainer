function goSearching () {
    basic.showString("S")
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 25)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 25)
    counter = 0
    searching = true
    basic.pause(500)
    while (searching) {
        distance = maqueen.Ultrasonic(PingUnit.Centimeters)
        if (distance > 0 && distance < 35) {
            maqueen.motorStop(maqueen.Motors.All)
            basic.showString("" + (distance))
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 25)
            basic.pause(10)
            maqueen.motorStop(maqueen.Motors.M1)
            music.playTone(988, music.beat(BeatFraction.Eighth))
            basic.pause(100)
            music.playTone(880, music.beat(BeatFraction.Half))
            found = true
            searching = false
        }
        if (counter > 100) {
            maqueen.motorStop(maqueen.Motors.All)
            found = false
            searching = false
        }
        basic.pause(100)
        counter += 1
    }
}
function goDance () {
    basic.showIcon(IconNames.Yes)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 255)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
    music.playTone(220, music.beat(BeatFraction.Eighth))
    basic.pause(100)
    music.playTone(220, music.beat(BeatFraction.Half))
    basic.pause(500)
    maqueen.motorStop(maqueen.Motors.All)
}
function goBack () {
    basic.showString("B")
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 255)
    basic.pause(2000)
    maqueen.motorStop(maqueen.Motors.All)
}
function goPush () {
    basic.showString("P")
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 255)
    pushing = true
    while (pushing) {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 || maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            maqueen.motorStop(maqueen.Motors.All)
            pushing = false
            basic.showString("L")
            music.playTone(220, music.beat(BeatFraction.Eighth))
        }
    }
}
let pushing = false
let distance = 0
let searching = false
let counter = 0
let found = false
let espera = true
while (espera) {
    basic.showString("X")
    if (input.logoIsPressed()) {
        espera = false
    }
}
let active = true
while (active) {
    found = false
    goSearching()
    if (found) {
        goPush()
        goBack()
    } else {
        active = false
    }
}
goDance()
