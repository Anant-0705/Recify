import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-md border-t border-slate-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-slate-300 mb-4">Step-By-Step for Dummies</h3>
            <div className="space-y-6 text-slate-400">
              <div>
                <h4 className="font-medium mb-2">Step 1: Add Your Ingredients</h4>
                <p className="text-sm">
                  Got a fridge full of random stuff? No problem! Just enter the ingredients you've got, 
                  whether it's that half-used bag of spinach, some leftover chicken, or the mysterious 
                  jar of pickles you've been avoiding. We're not judging.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Step 2: Let Recify Work Its Magic</h4>
                <p className="text-sm">
                  Once you've added your ingredients, sit back and relax. Our recipe wizard will work 
                  its magic and show you a list of mouthwatering recipes that you can actually make 
                  with what's in your kitchen.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Step 3: Cook & Enjoy</h4>
                <p className="text-sm">
                  Pick a recipe, grab your pan, and get cooking! Whether you're a culinary genius or 
                  just here for something simple, we've got recipes for every skill level. Who knows, 
                  you might even impress yourself.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-slate-300 mb-4">Quick Links</h3>
            <ul className="space-y-3 text-slate-400">
              <li>
                <a href="/" className="hover:text-slate-200 transition-colors flex items-center gap-2">
                  <span>🏠</span> Home
                </a>
              </li>
              <li>
                <a href="/ingredients" className="hover:text-slate-200 transition-colors flex items-center gap-2">
                  <span>🔍</span> Find Recipes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-slate-300 mb-4">Contact</h3>
            <div className="space-y-3 text-slate-400">
              <p className="flex items-center gap-2">
                <span>📧</span> support@recify.com
              </p>
              <p className="text-sm">
                Have questions or suggestions? We'd love to hear from you! 
                Drop us a line and we'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
          <p>© {new Date().getFullYear()} Recify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};