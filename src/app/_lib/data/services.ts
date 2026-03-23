import { categories, Category } from "./categories"

export interface Service {
    category: Category
    services: {
        img: string,
        desc: string,
        info: {
                name: string
                price: string
        }[]
    }[]
}

export const serviceList: Service[] = [
    {
        category: categories.get('nails') as Category,
        services: [
            {
                img: 'nail1.webp',
                info: [
                    {
                        name: 'Acrylic Nails',
                        price: '55+'
                    }
                ],
                desc: 'Strong, long-lasting nail enhancements sculpted with liquid and powder for added length and durability.'
            },
            {
                img: 'nail2.webp',
                info: [
                    {
                        name: 'Woman Pedicure',
                        price: '45+'
                    }
                ],
                desc: 'A relaxing foot treatment that includes nail shaping, exfoliation, a massage, and polish for soft, beautiful feet.'
            },
            {
                img: 'nail3.webp',
                info: [
                    {
                        name: 'Builder Gel',
                        price: '45+'
                    }
                ],
                desc: 'A gel-based service used to build strength and length on natural nails, cured under a LED/UV lamp for a glossy finish.'
            },
            {
                img: 'nail4.webp',
                info: [
                    {
                        name: 'Man Pedicure',
                        price: '35+'
                    }
                ],
                desc: 'A practical foot care service focused on trimming, shaping, callus removal, and a refreshing massage for well-groomed feet.'
            }
        ] 
    },
    {
        category: categories.get('browns') as Category,
        services: [
            {
                img: 'brown1.webp',
                info: [
                    {
                        name: 'Powders Browns',
                        price: '350'
                    },
                    {
                        name: 'Retouch',
                        price: '120'
                    }
                ],
                desc: 'A semi-permanent makeup technique that creates a soft, powdered, ombré effect for perfectly filled and defined eyebrows.'
            }
        ] 
    },
    {
        category: categories.get('lashes') as Category,
        services: [
            {
                img: 'lash1.webp',
                info: [
                    {
                        name: 'Mega Volume',
                        price: '175'
                    },
                    {
                        name: 'Refill 2-3 weeks',
                        price: '95'
                    }
                ],
                desc: 'The ultimate dramatic look. Achieved by applying multiple ultra-fine extensions to each natural lash for extreme fullness.'
            },
            {
                img: 'lash2.webp',
                info: [
                    {
                        name: 'Wispy',
                        price: '150'
                    },
                    {
                        name: 'Refill 2-3 weeks',
                        price: '85'
                    }
                ],
                desc: 'A textured, feathery look that combines classic and volume lashes of varying lengths to create a soft, flirty effect.'
            },
            {
                img: 'lash3.webp',
                info: [
                    {
                        name: 'Volume',
                        price: '140'
                    },
                    {
                        name: 'Refill 2-3 weeks',
                        price: '75'
                    }
                ],
                desc: 'A lightweight, full look created by applying 2-6 fine extensions to each natural lash. Provides more density than a classic set.'
            },
            {
                img: 'lash4.webp',
                info: [
                    {
                        name: 'Hawaiian',
                        price: '130'
                    },
                    {
                        name: 'Refill 2-3 weeks',
                        price: '75'
                    }
                ],
                desc: 'A technique where multiple mega-volume fans are applied to create an exceptionally dense, dramatic, and eye-catching effect.'
            },
            {
                img: 'lash5.webp',
                info: [
                    {
                        name: 'Classic Set',
                        price: '120'
                    },
                    {
                        name: 'Refill 2-3 weeks',
                        price: '50-65'
                    }
                ],
                desc: 'The natural enhancement. A single extension is applied to each natural lash for a defined, elegant, and subtle look.'
            },
            {
                img: 'lash6.webp',
                info: [
                    {
                        name: 'Lifting',
                        price: '75+'
                    }
                ],
                desc: 'A lash lift curls and lifts your natural lashes from the root, giving them a dramatic, upward sweep without the need for extensions.'
            }
        ] 
    },
    {
        category: categories.get('facial-tr') as Category,
        services: [
            {
                img: 'face1.webp',
                info: [
                    {
                        name: 'Mironeedling Treatment',
                        price: '140'
                    }
                ],
                desc: 'Uses tiny needles to stimulate collagen, improving texture, fine lines, and scars for a rejuvenated appearance.'
            },
            {
                img: 'face2.webp',
                info: [
                    {
                        name: 'Hydrogen Oxygen Facial',
                        price: '130'
                    }
                ],
                desc: 'A hydrating mist infusion that purifies pores and boosts radiance for a glowing complexion.'
            },
            {
                img: 'face4.webp',
                info: [
                    {
                        name: 'High Frecuency Treatment',
                        price: '100'
                    }
                ],
                desc: 'An electrical current that oxygenates, kills bacteria, and reduces inflammation to clarify and tone the skin.'
            },
            {
                img: 'face3.webp',
                info: [
                    {
                        name: 'LED Lights Treatment',
                        price: '100'
                    }
                ],
                desc: "A non-invasive therapy using different colored lights to target various skin concerns. From reducing acne and inflammation with Blue light to repairing and anti-aging with Red and Yellow light, this treatment is customized for your skin's needs. Note: Professional goggles must be worn during the treatment."
            }
        ] 
    },
    {
        category: categories.get('facial-hr') as Category,
        services: [
            {
                img: 'facial1.webp',
                info: [
                    {
                        name: 'Full Face',
                        price: '120'
                    }
                ],
                desc: "A complete treatment of all facial areas."
            },
            {
                img: 'facial2.webp',
                info: [
                    {
                        name: 'Neck (Front or Back)',
                        price: '60'
                    }
                ],
                desc: "Hair removal for the entire front or back of the neck."
            },
            {
                img: 'facial3.webp',
                info: [
                    {
                        name: 'Sideburns',
                        price: '50'
                    }
                ],
                desc: 'Removal of hair in the sideburn area for a clean contour.'
            },
            {
                img: 'facial4.webp',
                info: [
                    {
                        name: 'Chin',
                        price: '45'
                    }
                ],
                desc: ' Treatment for hair on the chin and jawline.'
            },
            {
                img: 'facial5.webp',
                info: [
                    {
                        name: 'Upper Lip',
                        price: '40'
                    }
                ],
                desc: 'Precise removal of the hair above the lip.'
            }
        ] 
    },
    {
        category: categories.get('upper-hr') as Category,
        services: [
            {
                img: 'upper1.webp',
                info: [
                    {
                        name: 'Full Back',
                        price: '200'
                    }
                ],
                desc: "Complete hair removal for the entire back."
            },
            {
                img: 'upper2.webp',
                info: [
                    {
                        name: 'Full Arms',
                        price: '150'
                    }
                ],
                desc: "Hair removal from the shoulders down to the wrists."
            },
            {
                img: 'upper3.webp',
                info: [
                    {
                        name: 'Chest',
                        price: '120'
                    }
                ],
                desc: 'Comprehensive hair removal for the chest area.'
            },
            {
                img: 'upper4.webp',
                info: [
                    {
                        name: 'Abdomen',
                        price: '100'
                    }
                ],
                desc: 'Treatment for hair on the stomach and abdomen.'
            },
            {
                img: 'upper5.webp',
                info: [
                    {
                        name: 'Half Arms',
                        price: '90'
                    }
                ],
                desc: 'Treatment for either the upper or lower half of the arms.'
            },
            {
                img: 'upper6.webp',
                info: [
                    {
                        name: 'Shoulders',
                        price: '80'
                    }
                ],
                desc: 'Treatment focused on the shoulder blades and cap area.'
            },
            {
                img: 'upper7.webp',
                info: [
                    {
                        name: 'Underarms',
                        price: '60'
                    }
                ],
                desc: 'Quick and effective treatment for underarm hair.'
            },
            {
                img: 'upper8.webp',
                info: [
                    {
                        name: 'Hands & Fingers',
                        price: '40'
                    }
                ],
                desc: 'Removal of fine hair on the hands and fingers.'
            }
        ] 
    },
    {
        category: categories.get('lower-hr') as Category,
        services: [
            {
                img: 'legs1.webp',
                info: [
                    {
                        name: 'Full Legs',
                        price: '250'
                    }
                ],
                desc: "Comprehensive treatment from the upper thighs to the ankles."
            },
            {
                img: 'legs2.webp',
                info: [
                    {
                        name: 'Half Legs',
                        price: '150'
                    }
                ],
                desc: "Hair removal for either the upper thighs or lower legs (knees to ankles)."
            },
            {
                img: 'legs3.webp',
                info: [
                    {
                        name: 'Brazilian',
                        price: '120'
                    }
                ],
                desc: 'A complete treatment for the intimate area.'
            },
            {
                img: 'legs4.webp',
                info: [
                    {
                        name: 'Buttocks',
                        price: '100'
                    }
                ],
                desc: 'Hair removal for the buttock area.'
            },
            {
                img: 'legs5.webp',
                info: [
                    {
                        name: 'Bikini Line',
                        price: '80'
                    }
                ],
                desc: 'Removal of hair along the panty line.'
            },
            {
                img: 'legs6.webp',
                info: [
                    {
                        name: 'Feet & Toes',
                        price: '40'
                    }
                ],
                desc: 'Removal of unwanted hair on the feet and between the toes.'
            }
        ] 
    },
    {
        category: categories.get('full-hr') as Category,
        services: [
            {
                img: 'full1.webp',
                info: [
                    {
                        name: 'Full Body',
                        price: '450'
                    }
                ],
                desc: "The most comprehensive package, including face, underarms, bikini line, legs, and arms."
            },
            {
                img: 'full2.webp',
                info: [
                    {
                        name: 'Lower Body Combo',
                        price: '320'
                    }
                ],
                desc: "A package for the lower body, including legs, bikini line, and buttocks."
            },
            {
                img: 'full3.webp',
                info: [
                    {
                        name: 'Upper Body Combo',
                        price: '300'
                    }
                ],
                desc: 'A bundle for the upper body, covering arms, underarms, chest, and back.'
            }
        ] 
    }
]