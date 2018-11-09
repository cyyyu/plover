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
    
    
    @IBAction func changeWallpaper(_ sender: NSButton) {
        
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
