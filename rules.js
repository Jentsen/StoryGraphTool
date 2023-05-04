class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // DONE: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData["InitialLocation"]); // DONE: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = key; // DONE: use `key` to get the data object for the current story location
        // SOLVED: How do i use this variable to access the body text and choices?
        // CHECK: Does this work with other choices?

        console.log(this.engine.storyData.Locations[locationData]);
        this.engine.show(this.engine.storyData.Locations[locationData]["Body"]); // TODO: replace this text by the Body of the location data
        // NOTE: only works for the first time, the second time it fails is shown as undefined

        if(this.engine.storyData.Locations[locationData]["Choices"]) { // DONE: check if the location has any Choices
            console.log(this.engine.storyData.Locations[locationData]["Choices"]);
            for(let choice of this.engine.storyData.Locations[locationData]["Choices"]) { // DONE?: loop over the location's Choices
                this.engine.addChoice(choice["Text"], choice["Target"]); // DONE?: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');