export function gsapHorizontalScroll(
        containerSelector,
        trackSelector,
        tabSelector,
      ) {
        const container = document.querySelector(containerSelector);
        const track = container.querySelector(trackSelector);
        const subTrackWidth = track.children[0].offsetWidth;
        const tabs = container.querySelectorAll(tabSelector);

        gsap.to(track, {
          x: () => -track.scrollWidth + subTrackWidth,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => "+=" + track.scrollWidth,
            pin: true,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,

            onUpdate: (self) => {
              if (tabSelector === undefined) return;

              const progress = self.progress; // 0 ~ 1
              const tabCount = tabs.length;

              const activeIndex = Math.min(
                tabCount - 1,
                Math.floor(progress * tabCount),
              );

              tabs.forEach((tab, index) => {
                tab.classList.toggle("active", index === activeIndex);
              });
            },
          },
        });
      }
