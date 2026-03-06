// ============================================================
// Robotic Perception Study Hub - Content Data
// ============================================================

const TOPICS = [
    {
        id: "sensors",
        icon: "&#128225;",
        title: "Sensors & Transducers",
        summary: "Cameras, LiDAR, IMUs, ultrasonic, radar, and tactile sensors used in robotics.",
        content: `
<h2>Sensors & Transducers</h2>
<p>Sensors are the fundamental building blocks of robotic perception. They convert physical phenomena into electrical signals that a robot can process.</p>

<h3>Camera Sensors</h3>
<ul>
    <li><strong>Monocular cameras</strong> &ndash; Single-lens; provide 2D images. Depth must be inferred via algorithms.</li>
    <li><strong>Stereo cameras</strong> &ndash; Two lenses separated by a baseline; compute depth via disparity.</li>
    <li><strong>RGB-D cameras</strong> &ndash; Provide color + depth (e.g., Intel RealSense, Microsoft Kinect).</li>
    <li><strong>Event cameras</strong> &ndash; Asynchronous sensors that detect per-pixel brightness changes with microsecond latency.</li>
</ul>

<div class="key-concept">
    <strong>Stereo Disparity:</strong> depth Z = (f &times; B) / d, where f = focal length, B = baseline, d = disparity in pixels.
</div>

<h3>LiDAR (Light Detection and Ranging)</h3>
<ul>
    <li>Measures distance by timing laser pulse reflections.</li>
    <li>Produces 3D point clouds with centimeter-level accuracy.</li>
    <li><strong>Mechanical LiDAR</strong> &ndash; Spinning mirror (e.g., Velodyne). 360-degree FOV.</li>
    <li><strong>Solid-state LiDAR</strong> &ndash; No moving parts; more compact and durable.</li>
    <li><strong>Flash LiDAR</strong> &ndash; Illuminates entire scene at once; faster but shorter range.</li>
</ul>

<div class="key-concept">
    <strong>Time-of-Flight:</strong> distance = (c &times; t) / 2, where c = speed of light, t = round-trip time.
</div>

<h3>Inertial Measurement Units (IMU)</h3>
<ul>
    <li>Contain accelerometers (linear acceleration) and gyroscopes (angular velocity).</li>
    <li>6-DOF IMUs: 3-axis accel + 3-axis gyro. 9-DOF adds magnetometer.</li>
    <li>Subject to drift over time; typically fused with other sensors (e.g., visual-inertial odometry).</li>
</ul>

<h3>Other Key Sensors</h3>
<ul>
    <li><strong>Ultrasonic</strong> &ndash; Sound-based ranging. Low cost, limited range (~5m), wide beam.</li>
    <li><strong>Radar</strong> &ndash; Radio waves. Works in fog, rain, darkness. Used in automotive ADAS.</li>
    <li><strong>Tactile / Force-Torque</strong> &ndash; Measure contact forces for manipulation tasks.</li>
    <li><strong>Encoders</strong> &ndash; Measure wheel/joint rotation for proprioception (odometry).</li>
</ul>
`
    },
    {
        id: "cv-fundamentals",
        icon: "&#128065;",
        title: "Computer Vision Fundamentals",
        summary: "Image formation, filtering, feature detection, and classical CV pipelines.",
        content: `
<h2>Computer Vision Fundamentals</h2>
<p>Computer vision transforms raw image data into structured information a robot can act upon.</p>

<h3>Image Formation</h3>
<ul>
    <li>The <strong>pinhole camera model</strong> projects 3D world points onto a 2D image plane.</li>
    <li><strong>Intrinsic parameters</strong>: focal length (fx, fy), principal point (cx, cy), distortion coefficients.</li>
    <li><strong>Extrinsic parameters</strong>: rotation R and translation t describing camera pose in the world frame.</li>
</ul>
<div class="formula">P_image = K [R | t] P_world</div>
<p>where K is the 3x3 intrinsic matrix.</p>

<h3>Image Filtering</h3>
<ul>
    <li><strong>Gaussian blur</strong> &ndash; Smoothing / noise reduction via convolution.</li>
    <li><strong>Sobel / Canny</strong> &ndash; Edge detection using gradient operators.</li>
    <li><strong>Morphological ops</strong> &ndash; Erosion, dilation for binary image cleanup.</li>
</ul>

<h3>Feature Detection & Description</h3>
<ul>
    <li><strong>Harris corner detector</strong> &ndash; Finds corners via eigenvalues of the structure tensor.</li>
    <li><strong>SIFT</strong> &ndash; Scale-Invariant Feature Transform. Robust to scale and rotation.</li>
    <li><strong>ORB</strong> &ndash; Oriented FAST and Rotated BRIEF. Fast, open-source alternative to SIFT.</li>
    <li><strong>SuperPoint / SuperGlue</strong> &ndash; Learned feature detectors and matchers using deep learning.</li>
</ul>

<div class="key-concept">
    <strong>Feature Matching Pipeline:</strong> Detect keypoints &rarr; Compute descriptors &rarr; Match descriptors (e.g., BFMatcher, FLANN) &rarr; Filter outliers (RANSAC).
</div>

<h3>Optical Flow</h3>
<ul>
    <li>Estimates per-pixel motion between consecutive frames.</li>
    <li><strong>Lucas-Kanade</strong> &ndash; Sparse optical flow (tracks specific points).</li>
    <li><strong>Farneback / RAFT</strong> &ndash; Dense optical flow (every pixel).</li>
</ul>
`
    },
    {
        id: "3d-perception",
        icon: "&#127760;",
        title: "3D Perception & Point Clouds",
        summary: "Point cloud processing, 3D object detection, surface reconstruction, and depth estimation.",
        content: `
<h2>3D Perception & Point Clouds</h2>
<p>3D perception gives robots spatial understanding of their environment.</p>

<h3>Point Cloud Basics</h3>
<ul>
    <li>A point cloud is a set of 3D points {(x, y, z)}, often with color or intensity.</li>
    <li>Sources: LiDAR, stereo cameras, RGB-D cameras, structure from motion.</li>
    <li>Common formats: PCD, PLY, LAS.</li>
</ul>

<h3>Point Cloud Processing</h3>
<ul>
    <li><strong>Downsampling</strong> &ndash; Voxel grid filter reduces density while preserving structure.</li>
    <li><strong>Normal estimation</strong> &ndash; Compute surface normals for each point using local neighborhoods.</li>
    <li><strong>Segmentation</strong> &ndash; RANSAC for planes; Euclidean clustering for objects.</li>
    <li><strong>Registration</strong> &ndash; ICP (Iterative Closest Point) aligns two point clouds.</li>
</ul>

<div class="key-concept">
    <strong>ICP Algorithm:</strong> 1) Find closest point pairs. 2) Compute optimal transform (R, t). 3) Apply transform. 4) Repeat until convergence.
</div>

<h3>Deep Learning on Point Clouds</h3>
<ul>
    <li><strong>PointNet</strong> &ndash; Directly processes raw point sets; uses max-pooling for permutation invariance.</li>
    <li><strong>PointNet++</strong> &ndash; Hierarchical version that captures local structures.</li>
    <li><strong>VoxelNet / PointPillars</strong> &ndash; Voxelize point clouds for 3D object detection.</li>
</ul>

<h3>Depth Estimation</h3>
<ul>
    <li><strong>Stereo matching</strong> &ndash; Compute disparity maps from rectified stereo pairs.</li>
    <li><strong>Monocular depth estimation</strong> &ndash; Predict depth from a single image using DNNs (e.g., MiDaS, DPT).</li>
    <li><strong>Structured light</strong> &ndash; Project known patterns; infer depth from deformation.</li>
</ul>
`
    },
    {
        id: "slam",
        icon: "&#128506;",
        title: "SLAM & Localization",
        summary: "Simultaneous Localization and Mapping, visual odometry, and state estimation.",
        content: `
<h2>SLAM & Localization</h2>
<p>SLAM allows a robot to build a map of an unknown environment while simultaneously tracking its own position within it.</p>

<h3>The SLAM Problem</h3>
<ul>
    <li>Estimate robot pose (position + orientation) and environment map simultaneously.</li>
    <li>The "chicken-and-egg" problem: need a map to localize, need localization to build a map.</li>
    <li>Core challenge: managing uncertainty and drift over time.</li>
</ul>

<h3>Visual Odometry (VO)</h3>
<ul>
    <li>Estimates camera motion from sequential images.</li>
    <li><strong>Feature-based VO</strong> &ndash; Track features (ORB, SIFT) across frames; estimate motion via essential/fundamental matrix.</li>
    <li><strong>Direct VO</strong> &ndash; Minimize photometric error directly on pixel intensities (e.g., DSO).</li>
</ul>

<h3>Key SLAM Systems</h3>
<ul>
    <li><strong>ORB-SLAM3</strong> &ndash; Feature-based; supports monocular, stereo, RGB-D, and IMU. State-of-the-art accuracy.</li>
    <li><strong>LSD-SLAM</strong> &ndash; Large-Scale Direct SLAM. Semi-dense direct method.</li>
    <li><strong>RTAB-Map</strong> &ndash; Real-Time Appearance-Based Mapping. Graph-based, multi-sensor.</li>
    <li><strong>Cartographer</strong> &ndash; Google's LiDAR SLAM. Submap-based approach.</li>
</ul>

<div class="key-concept">
    <strong>Loop Closure:</strong> Detecting when the robot revisits a previously mapped area. Critical for correcting accumulated drift. Techniques: bag-of-words (DBoW2), learned place recognition (NetVLAD).
</div>

<h3>Graph-Based SLAM</h3>
<ul>
    <li>Poses are nodes, constraints (odometry, loop closures) are edges.</li>
    <li>Optimization via least-squares (g2o, GTSAM, Ceres).</li>
    <li><strong>Factor graphs</strong> unify sensor measurements as probabilistic constraints.</li>
</ul>

<h3>Sensor Fusion for Localization</h3>
<ul>
    <li><strong>Extended Kalman Filter (EKF)</strong> &ndash; Linearized Bayesian estimation.</li>
    <li><strong>Particle Filter</strong> &ndash; Monte Carlo sampling; handles multimodal distributions.</li>
    <li><strong>Visual-Inertial Odometry (VIO)</strong> &ndash; Fuse camera + IMU (e.g., VINS-Mono, MSCKF).</li>
</ul>
`
    },
    {
        id: "object-detection",
        icon: "&#128270;",
        title: "Object Detection & Recognition",
        summary: "2D/3D detection, semantic segmentation, instance segmentation, and tracking.",
        content: `
<h2>Object Detection & Recognition</h2>
<p>Detecting, classifying, and localizing objects is essential for robots to interact with their environment.</p>

<h3>2D Object Detection</h3>
<ul>
    <li><strong>Two-stage detectors</strong> &ndash; Region proposals + classification (R-CNN, Faster R-CNN).</li>
    <li><strong>Single-stage detectors</strong> &ndash; Direct regression of boxes + classes (YOLO, SSD, RetinaNet).</li>
    <li><strong>Anchor-free detectors</strong> &ndash; Predict center points and sizes (CenterNet, FCOS).</li>
    <li><strong>Transformers</strong> &ndash; DETR uses set prediction; no need for NMS.</li>
</ul>

<div class="key-concept">
    <strong>IoU (Intersection over Union):</strong> IoU = Area of Overlap / Area of Union. Used to evaluate detection quality. Typical threshold: 0.5 for AP50.
</div>

<h3>Semantic Segmentation</h3>
<ul>
    <li>Classify every pixel in an image (e.g., road, sidewalk, pedestrian).</li>
    <li><strong>FCN</strong> &ndash; Fully Convolutional Network. Pioneer architecture.</li>
    <li><strong>U-Net</strong> &ndash; Encoder-decoder with skip connections.</li>
    <li><strong>DeepLabV3+</strong> &ndash; Atrous convolutions + ASPP for multi-scale features.</li>
</ul>

<h3>Instance & Panoptic Segmentation</h3>
<ul>
    <li><strong>Instance segmentation</strong> &ndash; Detect + segment individual objects (Mask R-CNN, YOLACT).</li>
    <li><strong>Panoptic segmentation</strong> &ndash; Combines semantic (stuff) + instance (things) segmentation.</li>
</ul>

<h3>3D Object Detection</h3>
<ul>
    <li><strong>From point clouds</strong> &ndash; PointPillars, CenterPoint, PV-RCNN.</li>
    <li><strong>From images</strong> &ndash; FCOS3D, DETR3D, BEVFormer.</li>
    <li><strong>Fusion</strong> &ndash; Combine camera + LiDAR (BEVFusion, TransFusion).</li>
</ul>

<h3>Multi-Object Tracking (MOT)</h3>
<ul>
    <li>Track objects across frames maintaining consistent IDs.</li>
    <li><strong>SORT / DeepSORT</strong> &ndash; Kalman filter + Hungarian algorithm (+ appearance features).</li>
    <li><strong>ByteTrack</strong> &ndash; Associates every detection (high + low confidence).</li>
</ul>
`
    },
    {
        id: "deep-learning",
        icon: "&#129504;",
        title: "Deep Learning for Perception",
        summary: "CNNs, transformers, self-supervised learning, and neural network architectures for robotics.",
        content: `
<h2>Deep Learning for Perception</h2>
<p>Deep learning has revolutionized robotic perception, enabling end-to-end learned representations.</p>

<h3>Convolutional Neural Networks (CNNs)</h3>
<ul>
    <li><strong>Convolution</strong> &ndash; Slides learned filters over input; captures local spatial patterns.</li>
    <li><strong>Pooling</strong> &ndash; Reduces spatial dimensions (max-pool, average-pool).</li>
    <li>Key architectures: ResNet (residual connections), EfficientNet (compound scaling), ConvNeXt.</li>
</ul>

<h3>Vision Transformers</h3>
<ul>
    <li><strong>ViT</strong> &ndash; Splits image into patches, treats them as tokens, applies transformer encoder.</li>
    <li><strong>Swin Transformer</strong> &ndash; Hierarchical with shifted windows for efficiency.</li>
    <li><strong>DINOv2</strong> &ndash; Self-supervised ViT producing general-purpose visual features.</li>
</ul>

<div class="key-concept">
    <strong>Self-Attention:</strong> Attention(Q, K, V) = softmax(QK<sup>T</sup> / &radic;d_k) V. Allows each patch to attend to every other patch, capturing global relationships.
</div>

<h3>Self-Supervised & Foundation Models</h3>
<ul>
    <li><strong>Contrastive learning</strong> &ndash; SimCLR, MoCo: learn representations by contrasting positive/negative pairs.</li>
    <li><strong>Masked image modeling</strong> &ndash; MAE: reconstruct masked patches (like BERT for images).</li>
    <li><strong>Vision-Language Models</strong> &ndash; CLIP, SigLIP: align images and text in a shared embedding space.</li>
    <li><strong>SAM (Segment Anything)</strong> &ndash; Foundation model for universal image segmentation.</li>
</ul>

<h3>Training Considerations for Robotics</h3>
<ul>
    <li><strong>Domain gap</strong> &ndash; Sim-to-real transfer. Use domain randomization or domain adaptation.</li>
    <li><strong>Real-time inference</strong> &ndash; Model pruning, quantization, TensorRT, knowledge distillation.</li>
    <li><strong>Data augmentation</strong> &ndash; Geometric transforms, color jitter, CutMix, mosaic augmentation.</li>
</ul>
`
    },
    {
        id: "sensor-fusion",
        icon: "&#128279;",
        title: "Sensor Fusion",
        summary: "Combining data from multiple sensors: Kalman filters, Bayesian fusion, and multi-modal perception.",
        content: `
<h2>Sensor Fusion</h2>
<p>Sensor fusion combines data from multiple sources to achieve more accurate and robust perception than any single sensor alone.</p>

<h3>Why Fuse Sensors?</h3>
<ul>
    <li><strong>Complementary</strong> &ndash; Different sensors capture different aspects (camera: appearance, LiDAR: geometry).</li>
    <li><strong>Redundant</strong> &ndash; Multiple sensors measuring the same thing increase reliability.</li>
    <li><strong>Cooperative</strong> &ndash; Combined data enables capabilities neither sensor has alone.</li>
</ul>

<h3>Fusion Levels</h3>
<ul>
    <li><strong>Low-level (data/early fusion)</strong> &ndash; Combine raw sensor data (e.g., project LiDAR points onto image).</li>
    <li><strong>Mid-level (feature fusion)</strong> &ndash; Fuse extracted features from each modality.</li>
    <li><strong>High-level (decision/late fusion)</strong> &ndash; Combine independent detection results.</li>
</ul>

<div class="key-concept">
    <strong>Kalman Filter Update:</strong><br>
    Predict: x&#770; = Ax + Bu, P = APA<sup>T</sup> + Q<br>
    Update: K = PH<sup>T</sup>(HPH<sup>T</sup> + R)<sup>-1</sup>, x = x&#770; + K(z - Hx&#770;), P = (I - KH)P
</div>

<h3>Common Fusion Approaches</h3>
<ul>
    <li><strong>Kalman Filter / EKF / UKF</strong> &ndash; Optimal for linear/Gaussian systems; extended/unscented for nonlinear.</li>
    <li><strong>Particle Filter</strong> &ndash; For highly nonlinear, non-Gaussian problems.</li>
    <li><strong>Factor Graph optimization</strong> &ndash; GTSAM, iSAM2 for batch or incremental estimation.</li>
    <li><strong>Deep fusion</strong> &ndash; BEVFusion, TransFusion: neural networks that learn to fuse modalities.</li>
</ul>

<h3>Camera-LiDAR Fusion</h3>
<ul>
    <li><strong>Calibration</strong> &ndash; Extrinsic calibration finds the rigid transform between camera and LiDAR frames.</li>
    <li><strong>Projection</strong> &ndash; Project 3D LiDAR points onto 2D image plane using camera intrinsics + extrinsics.</li>
    <li><strong>BEV (Bird's Eye View)</strong> &ndash; Transform features to a common top-down representation for fusion.</li>
</ul>
`
    },
    {
        id: "pose-estimation",
        icon: "&#129516;",
        title: "Pose Estimation",
        summary: "6-DOF object pose, human pose estimation, and hand/body tracking for robotics.",
        content: `
<h2>Pose Estimation</h2>
<p>Estimating the pose (position + orientation) of objects, humans, and robot end-effectors is crucial for manipulation and interaction.</p>

<h3>6-DOF Object Pose Estimation</h3>
<ul>
    <li>Estimate 3D rotation (R) and translation (t) of an object relative to the camera.</li>
    <li><strong>PnP (Perspective-n-Point)</strong> &ndash; Given 2D-3D correspondences, solve for pose.</li>
    <li><strong>Template matching</strong> &ndash; Compare rendered templates against observed images (LineMOD).</li>
    <li><strong>Learned approaches</strong> &ndash; PoseCNN, DenseFusion, FoundationPose.</li>
</ul>

<div class="key-concept">
    <strong>ADD / ADD-S Metric:</strong> Average distance between model points transformed by predicted vs. ground-truth pose. ADD-S uses closest point distance (for symmetric objects).
</div>

<h3>Human Pose Estimation</h3>
<ul>
    <li><strong>2D pose</strong> &ndash; Detect body joint locations in images (OpenPose, MediaPipe, HRNet).</li>
    <li><strong>3D pose</strong> &ndash; Lift 2D poses to 3D or regress 3D directly (SMPL, PARE).</li>
    <li><strong>Top-down vs. Bottom-up</strong> &ndash; Detect person first then joints, vs. detect all joints then group.</li>
</ul>

<h3>Hand Pose & Grasping</h3>
<ul>
    <li>Estimate hand keypoints for gesture recognition or teleoperation.</li>
    <li><strong>Grasp pose detection</strong> &ndash; Predict grasp poses (position, orientation, width) for robotic grippers.</li>
    <li><strong>GraspNet, Contact-GraspNet</strong> &ndash; Generate grasp candidates from point clouds.</li>
</ul>
`
    },
    {
        id: "scene-understanding",
        icon: "&#127968;",
        title: "Scene Understanding",
        summary: "Semantic mapping, occupancy grids, scene graphs, and spatial reasoning.",
        content: `
<h2>Scene Understanding</h2>
<p>Beyond detecting individual objects, robots need a holistic understanding of their environment.</p>

<h3>Occupancy Grids</h3>
<ul>
    <li>Discretize space into cells; each cell stores the probability of being occupied.</li>
    <li>Updated via Bayesian inference with sensor measurements (e.g., inverse sensor model).</li>
    <li><strong>2D grids</strong> &ndash; For navigation on flat surfaces (mobile robots).</li>
    <li><strong>3D grids / OctoMap</strong> &ndash; Octree-based 3D occupancy for UAVs and manipulation.</li>
</ul>

<h3>Semantic Mapping</h3>
<ul>
    <li>Augment geometric maps with semantic labels (e.g., "this region is a table").</li>
    <li>Combine SLAM + semantic segmentation for semantically-rich 3D maps.</li>
    <li>Useful for task planning: "go to the kitchen," "pick up the cup on the table."</li>
</ul>

<h3>3D Scene Representations</h3>
<ul>
    <li><strong>NeRF (Neural Radiance Fields)</strong> &ndash; Represent scenes as continuous volumetric functions; novel view synthesis.</li>
    <li><strong>3D Gaussian Splatting</strong> &ndash; Explicit 3D Gaussians for fast, high-quality rendering.</li>
    <li><strong>Signed Distance Functions (SDF)</strong> &ndash; Represent surfaces as zero-crossings of a distance field.</li>
</ul>

<div class="key-concept">
    <strong>Scene Graphs:</strong> Represent a scene as a graph where nodes are objects/regions and edges are relationships (e.g., "cup ON table", "chair NEAR desk"). Enable structured reasoning and language grounding.
</div>

<h3>Open-Vocabulary Perception</h3>
<ul>
    <li>Detect and segment objects using natural language queries, not fixed class lists.</li>
    <li><strong>OWL-ViT, Grounding DINO</strong> &ndash; Open-vocabulary object detection.</li>
    <li><strong>LERF, OpenScene</strong> &ndash; Embed language features into 3D representations.</li>
</ul>
`
    },
    {
        id: "robot-frameworks",
        icon: "&#9881;",
        title: "Perception in Practice",
        summary: "ROS integration, real-time pipelines, calibration, and deployment considerations.",
        content: `
<h2>Perception in Practice</h2>
<p>Deploying perception systems on real robots requires careful engineering beyond algorithms.</p>

<h3>ROS (Robot Operating System)</h3>
<ul>
    <li>Middleware for robotic software: publish/subscribe messaging, service calls, action servers.</li>
    <li><strong>Key perception packages:</strong> cv_bridge, image_transport, pcl_ros, tf2 (transforms).</li>
    <li><strong>ROS 2</strong> &ndash; Modern version with real-time support, DDS communication, lifecycle nodes.</li>
</ul>

<h3>Camera Calibration</h3>
<ul>
    <li><strong>Intrinsic calibration</strong> &ndash; Estimate focal length, principal point, distortion. Use checkerboard/ChArUco patterns.</li>
    <li><strong>Extrinsic calibration</strong> &ndash; Find the transform between sensors (e.g., camera-to-LiDAR, hand-eye calibration).</li>
    <li><strong>Hand-eye calibration</strong> &ndash; AX = XB problem. Find transform from camera to robot end-effector.</li>
</ul>

<div class="key-concept">
    <strong>Hand-Eye Calibration:</strong> "Eye-in-hand" (camera on gripper) vs. "Eye-to-hand" (camera fixed in workspace). Both solve AX = XB with different A and B.
</div>

<h3>Real-Time Considerations</h3>
<ul>
    <li><strong>GPU acceleration</strong> &ndash; CUDA, TensorRT, ONNX Runtime for fast inference.</li>
    <li><strong>Edge deployment</strong> &ndash; NVIDIA Jetson, Intel NUC for on-robot compute.</li>
    <li><strong>Latency budget</strong> &ndash; Perception pipeline must fit within control loop (10-100ms typical).</li>
    <li><strong>Synchronization</strong> &ndash; Time-sync multiple sensors (PTP, hardware triggers).</li>
</ul>

<h3>Common Perception Pipeline</h3>
<ol>
    <li>Acquire sensor data (cameras, LiDAR, IMU).</li>
    <li>Preprocess (undistort, filter, synchronize).</li>
    <li>Feature extraction / neural network inference.</li>
    <li>Sensor fusion and state estimation.</li>
    <li>Map update and object tracking.</li>
    <li>Publish results for planning and control.</li>
</ol>
`
    }
];

// ============================================================
// Flashcards
// ============================================================

const FLASHCARDS = [
    // Sensors
    { category: "Sensors", q: "What is the stereo depth formula?", a: "Z = (f x B) / d, where f = focal length, B = baseline distance, d = pixel disparity." },
    { category: "Sensors", q: "How does LiDAR measure distance?", a: "Time-of-Flight: distance = (speed of light x round-trip time) / 2." },
    { category: "Sensors", q: "What does a 6-DOF IMU measure?", a: "3-axis linear acceleration (accelerometer) + 3-axis angular velocity (gyroscope)." },
    { category: "Sensors", q: "What is an event camera?", a: "An asynchronous sensor where each pixel independently reports brightness changes with microsecond latency, instead of capturing full frames." },
    { category: "Sensors", q: "Why is IMU data prone to drift?", a: "Integration of noisy accelerometer/gyroscope data accumulates error over time, causing position and orientation estimates to drift." },
    { category: "Sensors", q: "What is the advantage of solid-state LiDAR over mechanical?", a: "No moving parts, making it more compact, durable, and reliable, with lower manufacturing cost." },
    { category: "Sensors", q: "What does an RGB-D camera provide?", a: "Both color (RGB) images and per-pixel depth (D) information, e.g., Intel RealSense, Microsoft Kinect." },

    // Computer Vision
    { category: "Computer Vision", q: "What is the pinhole camera model?", a: "A geometric model that projects 3D world points onto a 2D image plane through a single point (pinhole). P_image = K[R|t]P_world." },
    { category: "Computer Vision", q: "What are intrinsic camera parameters?", a: "Focal length (fx, fy), principal point (cx, cy), and lens distortion coefficients. They define the camera's internal geometry." },
    { category: "Computer Vision", q: "How does RANSAC help in feature matching?", a: "It robustly estimates a model (e.g., homography) by randomly sampling minimal subsets, identifying inliers, and rejecting outlier matches." },
    { category: "Computer Vision", q: "What is the difference between SIFT and ORB?", a: "SIFT is scale/rotation invariant using DoG + gradient histograms (patented until 2020). ORB uses FAST keypoints + rotated BRIEF descriptors and is much faster and open-source." },
    { category: "Computer Vision", q: "What is optical flow?", a: "The apparent motion of pixels between consecutive frames. Lucas-Kanade (sparse) tracks specific points; Farneback/RAFT estimate dense per-pixel flow." },
    { category: "Computer Vision", q: "What does the Canny edge detector do?", a: "Detects edges by: 1) Gaussian blur, 2) gradient magnitude/direction, 3) non-maximum suppression, 4) hysteresis thresholding." },

    // 3D Perception
    { category: "3D Perception", q: "What is ICP (Iterative Closest Point)?", a: "An algorithm that aligns two point clouds by iteratively: 1) finding closest point pairs, 2) computing optimal rigid transform, 3) applying transform, until convergence." },
    { category: "3D Perception", q: "How does PointNet achieve permutation invariance?", a: "It processes each point independently through shared MLPs, then applies a symmetric function (max pooling) to aggregate a global feature." },
    { category: "3D Perception", q: "What is voxel grid downsampling?", a: "Divides 3D space into uniform cubes (voxels) and replaces all points within each voxel with their centroid, reducing point cloud density." },
    { category: "3D Perception", q: "What is monocular depth estimation?", a: "Predicting a depth map from a single RGB image using deep neural networks (e.g., MiDaS, DPT). Provides relative or metric depth." },
    { category: "3D Perception", q: "What is a Signed Distance Function (SDF)?", a: "A function that returns the signed distance from any point in space to the nearest surface. Negative inside, positive outside, zero on the surface." },

    // SLAM
    { category: "SLAM", q: "What is the SLAM problem?", a: "Simultaneously estimating the robot's pose (position + orientation) AND building a map of the environment, without prior knowledge of either." },
    { category: "SLAM", q: "What is loop closure in SLAM?", a: "Detecting when the robot revisits a previously mapped location, allowing correction of accumulated drift in the trajectory and map." },
    { category: "SLAM", q: "How does graph-based SLAM work?", a: "Poses are nodes, odometry/loop closures are edges with constraints. A nonlinear least-squares optimizer (g2o, GTSAM) minimizes the total error." },
    { category: "SLAM", q: "What is Visual-Inertial Odometry (VIO)?", a: "Fuses camera images with IMU measurements to estimate ego-motion. The IMU provides short-term accuracy; vision prevents drift." },
    { category: "SLAM", q: "Name 3 major SLAM systems.", a: "ORB-SLAM3 (feature-based, multi-sensor), LSD-SLAM (direct, semi-dense), Cartographer (LiDAR, submap-based by Google)." },
    { category: "SLAM", q: "What is a factor graph in SLAM?", a: "A bipartite graph connecting variable nodes (poses, landmarks) and factor nodes (measurements/constraints). Enables unified probabilistic optimization." },

    // Object Detection
    { category: "Object Detection", q: "What is IoU (Intersection over Union)?", a: "A metric for detection quality: IoU = Area of Overlap / Area of Union between predicted and ground-truth bounding boxes." },
    { category: "Object Detection", q: "How does YOLO differ from Faster R-CNN?", a: "YOLO is single-stage (direct box + class regression, very fast). Faster R-CNN is two-stage (region proposal network + classifier, more accurate)." },
    { category: "Object Detection", q: "What is semantic vs. instance segmentation?", a: "Semantic: labels every pixel with a class. Instance: distinguishes individual object instances within the same class." },
    { category: "Object Detection", q: "What is panoptic segmentation?", a: "Combines semantic segmentation (stuff: sky, road) with instance segmentation (things: cars, people) into a unified output." },
    { category: "Object Detection", q: "How does DeepSORT track objects?", a: "Extends SORT by adding a deep appearance feature (Re-ID network) to the Kalman filter + Hungarian algorithm framework for better identity preservation." },
    { category: "Object Detection", q: "What is Non-Maximum Suppression (NMS)?", a: "Post-processing step that removes duplicate detections by keeping only the highest-confidence box among overlapping boxes (IoU > threshold)." },

    // Deep Learning
    { category: "Deep Learning", q: "What is the self-attention mechanism?", a: "Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) V. Each token attends to all others, capturing global dependencies regardless of distance." },
    { category: "Deep Learning", q: "How does a Vision Transformer (ViT) process images?", a: "Splits the image into fixed-size patches, linearly embeds them, adds positional encodings, and processes through transformer encoder layers." },
    { category: "Deep Learning", q: "What is contrastive learning?", a: "Self-supervised method that learns representations by pulling positive pairs (augmentations of same image) together and pushing negative pairs apart in embedding space." },
    { category: "Deep Learning", q: "What is domain randomization?", a: "Training technique for sim-to-real transfer: randomize visual properties (textures, lighting, colors) in simulation so the model generalizes to real-world variations." },
    { category: "Deep Learning", q: "What is knowledge distillation?", a: "Training a smaller (student) model to mimic the outputs of a larger (teacher) model, achieving compression while retaining much of the teacher's accuracy." },

    // Sensor Fusion
    { category: "Sensor Fusion", q: "What are the three levels of sensor fusion?", a: "Low-level (raw data fusion), Mid-level (feature fusion), High-level (decision/late fusion)." },
    { category: "Sensor Fusion", q: "What is the Kalman Filter?", a: "An optimal estimator for linear Gaussian systems. Predict step propagates state; update step corrects using measurement. Maintains mean + covariance." },
    { category: "Sensor Fusion", q: "Why fuse camera and LiDAR?", a: "Cameras provide rich appearance/color/texture. LiDAR provides accurate 3D geometry. Together they give robust, detailed 3D understanding." },
    { category: "Sensor Fusion", q: "What is BEV (Bird's Eye View) fusion?", a: "Transform features from multiple sensors (cameras, LiDAR) into a common top-down 2D representation, enabling unified spatial reasoning and fusion." },
    { category: "Sensor Fusion", q: "What is extrinsic calibration?", a: "Finding the rigid transformation (rotation R + translation t) between two sensor coordinate frames, e.g., camera-to-LiDAR." },

    // Pose Estimation
    { category: "Pose Estimation", q: "What is PnP (Perspective-n-Point)?", a: "Given n 2D-3D point correspondences, solve for the camera/object 6-DOF pose (rotation + translation). Minimum 4 points for a unique solution." },
    { category: "Pose Estimation", q: "What is the ADD metric for pose evaluation?", a: "Average Distance of model points transformed by predicted pose vs. ground-truth pose. ADD-S uses closest-point distance for symmetric objects." },
    { category: "Pose Estimation", q: "What is hand-eye calibration?", a: "Finding the transform X between camera and robot end-effector. Solves AX = XB, where A = robot motion, B = observed camera motion." },

    // Scene Understanding
    { category: "Scene Understanding", q: "What is an occupancy grid?", a: "A spatial representation that discretizes the environment into cells, each storing the probability of being occupied. Updated via Bayesian inference." },
    { category: "Scene Understanding", q: "What is NeRF?", a: "Neural Radiance Fields: represents a 3D scene as a continuous function mapping (x,y,z,direction) to (color, density). Enables photorealistic novel view synthesis." },
    { category: "Scene Understanding", q: "What is a scene graph?", a: "A graph where nodes are objects/regions and edges are spatial/semantic relationships (e.g., 'cup ON table'). Enables structured reasoning and language grounding." },
    { category: "Scene Understanding", q: "What is open-vocabulary detection?", a: "Detecting objects using free-form text queries rather than a fixed set of classes. Models like Grounding DINO and OWL-ViT enable this." },
    { category: "Scene Understanding", q: "What is 3D Gaussian Splatting?", a: "A 3D scene representation using explicit 3D Gaussians that can be rendered very quickly via differentiable rasterization, enabling real-time novel view synthesis." }
];

// ============================================================
// Quiz Questions
// ============================================================

const QUIZ_QUESTIONS = [
    // Sensors
    { category: "Sensors", question: "Which formula describes stereo depth estimation?", options: ["Z = f / (B x d)", "Z = (f x B) / d", "Z = (d x B) / f", "Z = d / (f x B)"], answer: 1 },
    { category: "Sensors", question: "A 9-DOF IMU includes which sensors?", options: ["Accelerometer + Gyroscope + GPS", "Accelerometer + Gyroscope + Magnetometer", "Accelerometer + Barometer + Magnetometer", "Gyroscope + Magnetometer + GPS"], answer: 1 },
    { category: "Sensors", question: "What advantage does an event camera have over a standard camera?", options: ["Higher resolution images", "Microsecond-level temporal resolution with low latency", "Built-in depth sensing", "Lower cost"], answer: 1 },
    { category: "Sensors", question: "Which LiDAR type has no moving parts?", options: ["Mechanical LiDAR", "Solid-state LiDAR", "Flash LiDAR", "Scanning LiDAR"], answer: 1 },
    { category: "Sensors", question: "What sensor works well in fog, rain, and darkness?", options: ["Camera", "LiDAR", "Radar", "Ultrasonic"], answer: 2 },

    // Computer Vision
    { category: "Computer Vision", question: "In the pinhole camera model, P_image = K[R|t]P_world. What is K?", options: ["Extrinsic matrix", "Intrinsic matrix", "Rotation matrix", "Distortion matrix"], answer: 1 },
    { category: "Computer Vision", question: "Which feature detector is scale and rotation invariant?", options: ["FAST", "Harris", "SIFT", "BRIEF"], answer: 2 },
    { category: "Computer Vision", question: "RANSAC is used primarily to:", options: ["Speed up feature detection", "Estimate models robustly in the presence of outliers", "Reduce image noise", "Compress feature descriptors"], answer: 1 },
    { category: "Computer Vision", question: "Lucas-Kanade computes what type of optical flow?", options: ["Dense", "Sparse", "Volumetric", "Semantic"], answer: 1 },
    { category: "Computer Vision", question: "What does ORB stand for?", options: ["Oriented Rotation and Binary", "Oriented FAST and Rotated BRIEF", "Optimal Robust Binary", "Ordinal Rotation Basis"], answer: 1 },

    // 3D Perception
    { category: "3D Perception", question: "What does the ICP algorithm iteratively minimize?", options: ["Photometric error", "Distance between corresponding point pairs", "Feature descriptor distance", "Voxel occupancy error"], answer: 1 },
    { category: "3D Perception", question: "How does PointNet achieve permutation invariance on point sets?", options: ["Sorting points by distance", "Using graph convolutions", "Max pooling as a symmetric function", "Voxelization"], answer: 2 },
    { category: "3D Perception", question: "Voxel grid downsampling replaces points in each voxel with:", options: ["The first point found", "A random point", "The centroid of all points", "The highest-intensity point"], answer: 2 },
    { category: "3D Perception", question: "Which model predicts depth from a single RGB image?", options: ["ICP", "PointNet", "MiDaS", "RANSAC"], answer: 2 },
    { category: "3D Perception", question: "In an SDF, what value does the surface have?", options: ["1", "-1", "0", "Infinity"], answer: 2 },

    // SLAM
    { category: "SLAM", question: "What is the 'chicken-and-egg' problem in SLAM?", options: ["Need depth to estimate motion, need motion to estimate depth", "Need a map to localize, need localization to build a map", "Need features to detect loops, need loops to detect features", "Need IMU to use camera, need camera to calibrate IMU"], answer: 1 },
    { category: "SLAM", question: "Loop closure is critical because it:", options: ["Speeds up computation", "Corrects accumulated drift", "Reduces memory usage", "Improves image quality"], answer: 1 },
    { category: "SLAM", question: "In graph-based SLAM, what do nodes represent?", options: ["Sensor measurements", "Robot poses", "Map features", "Loop closures"], answer: 1 },
    { category: "SLAM", question: "Which SLAM system is feature-based and supports monocular, stereo, RGB-D, and IMU?", options: ["LSD-SLAM", "Cartographer", "ORB-SLAM3", "RTAB-Map"], answer: 2 },
    { category: "SLAM", question: "What does VIO stand for?", options: ["Visual Image Optimization", "Visual-Inertial Odometry", "Volumetric Integration Output", "Vector Intersection Operation"], answer: 1 },

    // Object Detection
    { category: "Object Detection", question: "An IoU threshold of 0.5 is commonly used for which metric?", options: ["AP50", "mAP75", "Recall@100", "F1-Score"], answer: 0 },
    { category: "Object Detection", question: "Which is a single-stage object detector?", options: ["R-CNN", "Faster R-CNN", "YOLO", "Cascade R-CNN"], answer: 2 },
    { category: "Object Detection", question: "Mask R-CNN performs which task?", options: ["Semantic segmentation", "Instance segmentation", "Panoptic segmentation", "Scene classification"], answer: 1 },
    { category: "Object Detection", question: "DETR eliminates the need for which post-processing step?", options: ["Resizing", "NMS (Non-Maximum Suppression)", "Data augmentation", "Feature pyramid"], answer: 1 },
    { category: "Object Detection", question: "DeepSORT adds what to the SORT tracker?", options: ["Optical flow", "Deep appearance features (Re-ID)", "Semantic segmentation", "Depth estimation"], answer: 1 },

    // Deep Learning
    { category: "Deep Learning", question: "In self-attention, what are the three input matrices?", options: ["Input, Output, Bias", "Query, Key, Value", "Weight, Gradient, Activation", "Encoder, Decoder, Attention"], answer: 1 },
    { category: "Deep Learning", question: "How does ViT process an image?", options: ["Applies convolutions at multiple scales", "Splits into patches and treats them as tokens", "Uses recurrent layers on pixel rows", "Applies graph convolutions on superpixels"], answer: 1 },
    { category: "Deep Learning", question: "Domain randomization is used for:", options: ["Data compression", "Sim-to-real transfer", "Model pruning", "Loss function design"], answer: 1 },
    { category: "Deep Learning", question: "Which is a self-supervised Vision Transformer method?", options: ["YOLO", "DINOv2", "Faster R-CNN", "DeepLab"], answer: 1 },
    { category: "Deep Learning", question: "TensorRT is used for:", options: ["Training larger models", "Optimizing inference speed on NVIDIA GPUs", "Data labeling", "Sensor calibration"], answer: 1 },

    // Sensor Fusion
    { category: "Sensor Fusion", question: "Which is NOT a level of sensor fusion?", options: ["Low-level (data fusion)", "Mid-level (feature fusion)", "High-level (decision fusion)", "Ultra-level (quantum fusion)"], answer: 3 },
    { category: "Sensor Fusion", question: "The Kalman Filter is optimal for which type of system?", options: ["Nonlinear, non-Gaussian", "Linear, Gaussian", "Any dynamic system", "Static systems only"], answer: 1 },
    { category: "Sensor Fusion", question: "BEV fusion transforms features into which view?", options: ["Front view", "Side view", "Bird's Eye (top-down) view", "Isometric view"], answer: 2 },
    { category: "Sensor Fusion", question: "Extrinsic calibration finds:", options: ["Focal length and distortion", "The rigid transform between two sensor frames", "The neural network weights", "The optimal sampling rate"], answer: 1 },

    // Pose Estimation
    { category: "Pose Estimation", question: "PnP requires at minimum how many 2D-3D correspondences for a unique solution?", options: ["2", "3", "4", "6"], answer: 2 },
    { category: "Pose Estimation", question: "Hand-eye calibration solves which equation?", options: ["AX = B", "AX = XB", "X = AB", "AXB = I"], answer: 1 },
    { category: "Pose Estimation", question: "ADD-S metric is used specifically for:", options: ["Asymmetric objects", "Symmetric objects", "Deformable objects", "Transparent objects"], answer: 1 },

    // Scene Understanding
    { category: "Scene Understanding", question: "An occupancy grid cell stores:", options: ["RGB color", "Probability of being occupied", "Object class label", "Surface normal"], answer: 1 },
    { category: "Scene Understanding", question: "NeRF maps (x, y, z, direction) to:", options: ["Depth and normal", "Color and density", "Class and confidence", "Flow and disparity"], answer: 1 },
    { category: "Scene Understanding", question: "Which enables object detection with free-form text queries?", options: ["YOLO", "Faster R-CNN", "Grounding DINO", "SSD"], answer: 2 }
];

// ============================================================
// Glossary
// ============================================================

const GLOSSARY = [
    { term: "Accelerometer", definition: "Sensor that measures linear acceleration along one or more axes." },
    { term: "ADD / ADD-S", definition: "Average Distance metric for evaluating 6-DOF pose estimation accuracy. ADD-S uses closest-point distance for symmetric objects." },
    { term: "ADAS", definition: "Advanced Driver Assistance Systems. Automotive safety features using perception (lane keeping, collision avoidance)." },
    { term: "Atrous Convolution", definition: "Dilated convolution that inserts gaps in the kernel to increase receptive field without adding parameters." },
    { term: "Backpropagation", definition: "Algorithm for computing gradients of the loss function with respect to network weights, enabling training via gradient descent." },
    { term: "Bag of Words (BoW)", definition: "Representation that describes an image as a histogram of visual word occurrences. Used in loop closure detection (DBoW2)." },
    { term: "Baseline", definition: "The physical distance between two camera centers in a stereo setup. Larger baseline = better depth resolution at distance." },
    { term: "BEV (Bird's Eye View)", definition: "Top-down 2D representation of the 3D scene. Common fusion space for camera and LiDAR features." },
    { term: "Calibration", definition: "Process of determining sensor parameters (intrinsic: focal length, distortion; extrinsic: relative pose between sensors)." },
    { term: "Canny Edge Detector", definition: "Multi-stage edge detection: Gaussian smoothing, gradient computation, non-max suppression, hysteresis thresholding." },
    { term: "CNN (Convolutional Neural Network)", definition: "Neural network using convolutional layers to extract spatial features from grid-like data (images)." },
    { term: "Contrastive Learning", definition: "Self-supervised learning paradigm that trains representations by pulling similar samples together and pushing dissimilar ones apart." },
    { term: "Depth Map", definition: "An image where each pixel value represents the distance from the camera to the corresponding 3D point." },
    { term: "DETR", definition: "DEtection TRansformer. End-to-end object detector using transformer architecture; eliminates need for NMS." },
    { term: "Disparity", definition: "The difference in pixel position of a point between left and right stereo images. Inversely proportional to depth." },
    { term: "Domain Randomization", definition: "Training technique for sim-to-real transfer by randomizing visual properties in simulation." },
    { term: "EKF (Extended Kalman Filter)", definition: "Kalman Filter extension for nonlinear systems using first-order Taylor expansion (Jacobians) for linearization." },
    { term: "Encoder-Decoder", definition: "Architecture that compresses input to a latent representation (encoder) then reconstructs output (decoder). Used in segmentation (U-Net)." },
    { term: "Factor Graph", definition: "Bipartite graph connecting variable nodes and factor nodes representing probabilistic constraints. Used in SLAM optimization." },
    { term: "Feature Descriptor", definition: "A numerical vector describing the local appearance around a keypoint (e.g., SIFT descriptor: 128-dim, ORB: 256-bit binary)." },
    { term: "FLANN", definition: "Fast Library for Approximate Nearest Neighbors. Efficient algorithm for matching feature descriptors." },
    { term: "FOV (Field of View)", definition: "The angular extent of the observable world seen by a sensor at any given moment." },
    { term: "Gaussian Splatting (3DGS)", definition: "3D scene representation using explicit 3D Gaussians, enabling real-time novel view synthesis via differentiable rasterization." },
    { term: "GTSAM", definition: "Georgia Tech Smoothing and Mapping. C++ library for factor graph optimization in SLAM and state estimation." },
    { term: "Gyroscope", definition: "Sensor that measures angular velocity (rate of rotation) around one or more axes." },
    { term: "Hand-Eye Calibration", definition: "Finding the transform between a camera and a robot end-effector. Solves AX = XB." },
    { term: "Homography", definition: "A 3x3 projective transformation matrix relating two views of a planar surface." },
    { term: "ICP (Iterative Closest Point)", definition: "Algorithm for aligning two point clouds by iteratively minimizing the distance between closest point pairs." },
    { term: "IMU", definition: "Inertial Measurement Unit. Combines accelerometers and gyroscopes (and optionally magnetometers) for motion sensing." },
    { term: "Instance Segmentation", definition: "Pixel-level classification that distinguishes individual object instances (e.g., car_1, car_2) within the same class." },
    { term: "IoU (Intersection over Union)", definition: "Metric for detection/segmentation quality: area of overlap divided by area of union between predicted and ground-truth regions." },
    { term: "Kalman Filter", definition: "Optimal recursive estimator for linear Gaussian systems. Alternates between predict (propagate state) and update (incorporate measurement) steps." },
    { term: "Keypoint", definition: "A distinctive point in an image that can be reliably detected across views (corners, blobs). E.g., Harris corners, FAST keypoints." },
    { term: "Knowledge Distillation", definition: "Model compression technique where a smaller student network learns to mimic the output distribution of a larger teacher network." },
    { term: "LiDAR", definition: "Light Detection and Ranging. Uses laser pulses to measure distances, producing 3D point clouds." },
    { term: "Loop Closure", definition: "In SLAM, detecting when the robot revisits a previously mapped location, allowing drift correction." },
    { term: "mAP (mean Average Precision)", definition: "Standard metric for object detection: average of AP across all classes, computed at various IoU thresholds." },
    { term: "NeRF (Neural Radiance Field)", definition: "Implicit neural representation mapping 3D coordinates + viewing direction to color and density for novel view synthesis." },
    { term: "NMS (Non-Maximum Suppression)", definition: "Post-processing that removes duplicate detections by keeping only the highest-confidence box among overlapping predictions." },
    { term: "Occupancy Grid", definition: "Spatial representation discretizing the environment into cells, each storing a probability of occupancy." },
    { term: "Odometry", definition: "Estimating change in position over time from sensor data (wheel encoders, visual, inertial)." },
    { term: "Optical Flow", definition: "Apparent motion of pixels between consecutive image frames. Can be sparse (specific points) or dense (all pixels)." },
    { term: "ORB-SLAM", definition: "Feature-based visual SLAM system using ORB features. Version 3 supports mono/stereo/RGB-D with optional IMU." },
    { term: "Panoptic Segmentation", definition: "Unifies semantic segmentation (stuff classes like sky, road) and instance segmentation (thing classes like cars, people)." },
    { term: "Particle Filter", definition: "Monte Carlo method for state estimation using weighted samples (particles). Handles nonlinear, non-Gaussian distributions." },
    { term: "PnP (Perspective-n-Point)", definition: "Algorithm to estimate camera pose from n known 2D-3D point correspondences. Requires minimum 4 points." },
    { term: "Point Cloud", definition: "A set of 3D points {(x,y,z)} representing the geometry of objects/scenes, often with additional attributes (color, intensity)." },
    { term: "PointNet", definition: "Deep learning architecture that directly processes raw point clouds using shared MLPs + max pooling for permutation invariance." },
    { term: "Principal Point", definition: "The point where the optical axis intersects the image plane. Part of the camera intrinsic parameters (cx, cy)." },
    { term: "RANSAC", definition: "Random Sample Consensus. Robust estimation method that iteratively fits a model to inlier data, rejecting outliers." },
    { term: "ROS (Robot Operating System)", definition: "Open-source middleware providing tools, libraries, and conventions for building robot software (pub/sub, transforms, visualization)." },
    { term: "Scene Graph", definition: "Graph representation of a scene: nodes = objects/regions, edges = relationships (spatial, semantic)." },
    { term: "Self-Attention", definition: "Mechanism where each element in a sequence attends to all others: Attention(Q,K,V) = softmax(QK^T/sqrt(d_k))V." },
    { term: "Semantic Segmentation", definition: "Assigning a class label to every pixel in an image (e.g., road, building, person) without distinguishing instances." },
    { term: "SLAM", definition: "Simultaneous Localization and Mapping. Jointly estimating robot pose and building an environment map." },
    { term: "Stereo Vision", definition: "Using two cameras with known baseline to compute depth from disparity between matching points in left and right images." },
    { term: "Structure from Motion (SfM)", definition: "Reconstructing 3D structure and camera poses from a collection of 2D images taken from different viewpoints." },
    { term: "TensorRT", definition: "NVIDIA's SDK for high-performance deep learning inference optimization (layer fusion, quantization, kernel tuning)." },
    { term: "Time-of-Flight (ToF)", definition: "Distance measurement by timing how long a signal (light, sound) takes to travel to a target and back." },
    { term: "Transformer", definition: "Neural architecture using self-attention to model relationships between all elements in a sequence. Basis for ViT, DETR." },
    { term: "Visual Odometry", definition: "Estimating camera/robot motion by analyzing changes in sequential images (feature tracking or direct methods)." },
    { term: "ViT (Vision Transformer)", definition: "Applies transformer architecture to image classification by treating image patches as tokens." },
    { term: "Voxel", definition: "A volumetric pixel; the 3D equivalent of a 2D pixel. Used to discretize 3D space for processing." },
    { term: "YOLO", definition: "You Only Look Once. Single-stage real-time object detector that predicts bounding boxes and classes in one forward pass." }
].sort((a, b) => a.term.localeCompare(b.term));
