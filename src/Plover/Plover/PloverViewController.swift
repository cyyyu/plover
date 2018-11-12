//
//  PloverViewController.swift
//  Plover
//
//  Created by Chuang Yu on 2018/11/8.
//  Copyright © 2018 Chuang Yu. All rights reserved.
//

import Cocoa

class PloverViewController: NSViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBOutlet var query: NSTextField?
    @IBOutlet weak var changeBtn: NSButton!
    
    @IBAction func changeWallpaper(_ sender: NSButton) {
        let url: String = "https://source.unsplash.com/random?"
        
        guard query?.stringValue != nil else {
            return
        }

        let imgUrl = URL(string: url + (query?.stringValue)!)!
//        let workspace = NSWorkspace.shared
//        do {
//            if let screen = NSScreen.main  {
//                try workspace.setDesktopImageURL(imgUrl, for: screen, options: [:])
//            }
//        } catch {
//            print("Set wallpaper error: \(error)")
//        }
        
        let session = URLSession.shared
        let sessionTask = session.dataTask(with: imgUrl) { (data, response, error) -> Void in
            if let e = error {
                print("Error downloading picture: \(e)")
            } else {
                if let res = response as? HTTPURLResponse {
                    print("Downloaded cat picture with response code \(res.statusCode)")
                    if let imageData = data {
                        // Finally convert that Data into an image and do what you wish with it.
                        let image = NSImage(data: imageData)
                        // Do something with your image.
                        print(image)
                        let p = URL(dataRepresentation: imageData)
                        
                        let workspace = NSWorkspace.shared
                        do {
                            if let screen = NSScreen.main {
                                try workspace.setDesktopImageURL(image, for: screen, options: [:])
                            }
                        } catch {
                            print("Set wallpaper error: \(error)")
                        }
                    } else {
                        print("Couldn't get image: Image is nil")
                    }
                } else {
                    print("Couldn't get response code for some reason")
                }
            }
        }

        sessionTask.resume()
    }
    
    @IBAction func quit(_ sender: NSButton) {
        NSApplication.shared.terminate(sender)
    }
}

extension PloverViewController {
    // MARK: Storyboard instantiation
    static func freshController() -> PloverViewController {
        let storyboard = NSStoryboard(name: NSStoryboard.Name("Main"), bundle: nil)
        let identifier = NSStoryboard.SceneIdentifier("PloverViewController")
        guard let viewcontroller = storyboard.instantiateController(withIdentifier: identifier) as? PloverViewController else {
            fatalError("Why cant i find PloverViewController? - Check Main.storyboard")
        }
        return viewcontroller
    }
}
