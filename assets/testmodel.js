
  // Classifier Variable
  let classifier;
  let constraints;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/0JbPikCro/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  //打開攝影機
  function setup() {
    createCanvas(800 , 720);
    // Create the video
    video = createCapture(VIDEO);
    video.size(800, 650);
    video.hide();
    
    constraints = { //相機限制
      audio: false,
      video: {
        facingMode: "environment"  //開後鏡頭
      }
    };
    // 從攝影機擷取影像並辨識
    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }
  function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);

    // Draw the label
    fill(255);
    textSize(48);
    textAlign(CENTER);
    text(label, width / 2, height - 10);
  }
  //辨識影像
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    //label = results[0].label;
    // 讀取辨識信賴度最高的分類名稱 (標籤) 及信賴度
    label = String(results[0].label);
    conf = Math.round(Number(results[0].confidence) * 10000) / 100;
    console.log(`Result: ${label} (${conf} %)`);
    // Classifiy again!
    classifyVideo();
  }
